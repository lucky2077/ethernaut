//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface Token {
    function transfer(address _to, uint256 _value) external returns (bool);
}

contract Quest05 is Ownable {
    function transfer(address tokenAddress, uint256 _value) public onlyOwner {
        Token(tokenAddress).transfer(owner(), _value);
    }
}
