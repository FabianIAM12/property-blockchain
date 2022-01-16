var RealEstateToken = artifacts.require('RealEstateToken');

contract('TestERC721Mintable', accounts => {
    let contract, maxValue;
    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            contract = await RealEstateToken.new({from: account_one});

            let i = 0;
            maxValue = 5;
            while (i < maxValue) {
                await contract.mint(account_one, i, { from: account_one });
                i += 1;
            }

            // one token for second account
            await contract.mint(account_two, i + 1, {from: account_one});
        })

        it('should return total supply', async function () {
            let totalSupply = await contract.totalSupply.call();
            assert.equal(totalSupply, maxValue + 1, "There should be five tokens minted.");
        })

        it('should get token balance', async function () {
            let tokenBalanceOne = await contract.balanceOf.call(account_one);
            let tokenBalanceTwo = await contract.balanceOf.call(account_two);
            assert.equal(tokenBalanceOne, 5, "Balance differs");
            assert.equal(tokenBalanceTwo, 1, "Not equal to one");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            const base = await contract.getBaseTokenURI()
            assert.equal(base, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/');

            const uri1 = await contract.tokenURI(1);
            assert.equal(uri1, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1');
            const uri2 = await contract.tokenURI(2);
            assert.equal(uri2, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2');
            const uri3 = await contract.tokenURI(3);
            assert.equal(uri3, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3');
        })

        it('should transfer token from one owner to another', async function () { 
            let beforeOwner = await contract.ownerOf.call(4);
            assert.equal(beforeOwner, account_one);

            await contract.transferFrom(account_one, account_two, 4, {from: account_one});

            let afterOwner = await contract.ownerOf.call(4);
            assert.equal(afterOwner, account_two);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await RealEstateToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let failed = false;
            try  {
                await contract.mint(account_one, 6, { from: account_two });
            } catch(e) {
                failed = true;
            }
            assert.equal(failed, true, "Mint should only executed when address is not contract owner");
        })

        it('should return contract owner', async function () { 
            const owner = await contract.getOwner.call();
            assert.equal(owner, account_one, "The contract owner should be contract one");
        })
    });
})
