pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './ERC721Mintable.sol';
import './Verifier.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ArtToken, Verifier {
    uint count = 0;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        address sender;
    }

    // TODO define an array of the above struct
    Solution[] public solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) solutionsExist;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint index, address owner);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input) public returns (uint256)
    {
        Solution memory newSolution = Solution({
            index: count++,
            sender: msg.sender
        });

        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        solutionsExist[key] = newSolution;
        solutions.push(newSolution);
        emit SolutionAdded(newSolution.index, newSolution.sender);
        return newSolution.index;
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    function mintVerified(
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input,
        uint tokenId, string memory url) public returns (uint256)
    {
        bytes32 key = keccak256(abi.encodePacked(a,b,c, input));

        require(solutionsExist[key].sender == address(0), 'Solution not unique');
        require(verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), 'Solution not valid');

        addSolution(a, a_p, b, b_p, c, c_p, h, k, input);

        mint(msg.sender, tokenId, url);
        return tokenId;
    }
}
