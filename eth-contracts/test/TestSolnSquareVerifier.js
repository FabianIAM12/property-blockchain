// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var RealEstateToken = artifacts.require('RealEstateToken');

contract('SolnSquareVerifier', accounts => {
    let contractSolnVerifier;
    let contractRealEstate;
    const account_one = accounts[0];

    describe('Verification Soln', function () {
        beforeEach(async function () {
            contractSolnVerifier = await SolnSquareVerifier.new({from: account_one});
            contractRealEstate = await RealEstateToken.new({from: account_one});
        })

        it('should verify adding', async function () {
            let a = ["0x2444a5ee4d617c16fe6caa0d21fc4ddc8128dec9d0c0e20cda2d6aad343db73", "0x18334d872105bb5df9dc5d988f7f5768147a35c62210275ed17e77b244f8842b"];
            let a_p = ["0x11c624a8943d443d8d5a278475b9b099339b60ad2d03eeb1587078cad0aac96e", "0xec2ed8965e4136825346fc8e8e41e1ab6b9ec81b9cdee7df7df73a9565ad51a"];
            let b = [["0x16fd9a0aad1946347bd1e68e6855c401f8cc513133f75f4fc7a29804a524a56", "0x1078c0d53e35674a277e6c7e12839d1d55dd020f4150f0d19c660e68ab16b962"],
                ["0x1ee6bc4a7a662de3ea140ccb547e4f6177585f5ba4f50e8c7a6c8dcecb3b934f", "0x17599a029c0a2492c4e56e8601bff80f03d96551036eed93fc0e48d774b7ef9"]];

            let b_p = ["0x7dd406db7ad238baeca67d42568be8500a5aea6cc66ae0848873367b34383e3", "0x149cc3981a0e5e286e3db8f9d1805472fcc06835b52dc3e15a286324ae95e3de"];
            let c = ["0x1b2d6295e509d18e9491de63c79c4aa552ba6f345c86f39d0564c84e9ef7b195", "0x16ac91145f17cc5b3dce4245c329c3fe2c3048c4fc2b71261e2ccf853d6321de"];
            let c_p = ["0x2eca989c1d86acbafaf009413b0a61b81206f17f050a010aba31c238beace7bf", "0x8578557806f63f7956f6c7d17f488c29a384c636b1329707915130fd88165ea"];
            let h = ["0x222b4fb80b9ec88765b86e49ab98abf1e144ec26c0edb2bae512518cd275a10d", "0x243fde8afcd79b99ad46c62ab4f0e489cc3e196811166ddf6cbc488803accce3"];
            let k = ["0x2778b059f34bb39b09845524e33389a2439a884cf98db7c40ed7d5482791aa00", "0x2880c29be34d74cc467d5252248184240f7a2dcee75775d2f488db062c753bb9"];
            let inputs = [9,1];

            let verification = await contractSolnVerifier.addSolution.call(a, a_p, b, b_p, c, c_p, h, k, inputs);
            assert.equal(verification, 0, "Should be valid.");
        })

        it('should mint a token', async function () {
            let a = ["0x2444a5ee4d617c16fe6caa0d21fc4ddc8128dec9d0c0e20cda2d6aad343db73", "0x18334d872105bb5df9dc5d988f7f5768147a35c62210275ed17e77b244f8842b"];
            let a_p = ["0x11c624a8943d443d8d5a278475b9b099339b60ad2d03eeb1587078cad0aac96e", "0xec2ed8965e4136825346fc8e8e41e1ab6b9ec81b9cdee7df7df73a9565ad51a"];
            let b = [["0x16fd9a0aad1946347bd1e68e6855c401f8cc513133f75f4fc7a29804a524a56", "0x1078c0d53e35674a277e6c7e12839d1d55dd020f4150f0d19c660e68ab16b962"],
                ["0x1ee6bc4a7a662de3ea140ccb547e4f6177585f5ba4f50e8c7a6c8dcecb3b934f", "0x17599a029c0a2492c4e56e8601bff80f03d96551036eed93fc0e48d774b7ef9"]];

            let b_p = ["0x7dd406db7ad238baeca67d42568be8500a5aea6cc66ae0848873367b34383e3", "0x149cc3981a0e5e286e3db8f9d1805472fcc06835b52dc3e15a286324ae95e3de"];
            let c = ["0x1b2d6295e509d18e9491de63c79c4aa552ba6f345c86f39d0564c84e9ef7b195", "0x16ac91145f17cc5b3dce4245c329c3fe2c3048c4fc2b71261e2ccf853d6321de"];
            let c_p = ["0x2eca989c1d86acbafaf009413b0a61b81206f17f050a010aba31c238beace7bf", "0x8578557806f63f7956f6c7d17f488c29a384c636b1329707915130fd88165ea"];
            let h = ["0x222b4fb80b9ec88765b86e49ab98abf1e144ec26c0edb2bae512518cd275a10d", "0x243fde8afcd79b99ad46c62ab4f0e489cc3e196811166ddf6cbc488803accce3"];
            let k = ["0x2778b059f34bb39b09845524e33389a2439a884cf98db7c40ed7d5482791aa00", "0x2880c29be34d74cc467d5252248184240f7a2dcee75775d2f488db062c753bb9"];
            let inputs = [9,1];

            const tokenId = 123;
            let newTokenId = await contractSolnVerifier.mintVerified.call(a, a_p, b, b_p, c, c_p, h, k, inputs, tokenId);
            assert.equal(newTokenId, tokenId, "Should be valid.");
        })

    });
})
