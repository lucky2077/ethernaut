//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract Quest11 is Ownable {
    bool top = true;

    function goTo(address elevatorAddr, uint256 _floor) public {
        IElevator(elevatorAddr).goTo(_floor);
    }

    function isLastFloor(uint256 _floor) external returns (bool) {
        console.log("isLastFloor", _floor);
        top = !top;
        return top;
    }
}
