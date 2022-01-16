// var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
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
                const result = await contract.mint(account_one, i, { from: account_one });
                i += 1;
            }

            // one token for second account
            await contract.mint(account_two, i + 1, {from: account_two});
        })

        it('should return total supply', async function () { 
            let totalSupply = await contract.totalSupply.call();
            assert.equal(totalSupply, maxValue, "There should be five tokens minted.");
        })

        it('should get token balance', async function () {

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            // this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 

        })

    });
})