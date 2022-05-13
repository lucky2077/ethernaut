//SPDX-License-Identifier: Unlicense
pragma solidity ~0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Quest05 is Ownable {
    function transfer(address tokenAddress, uint256 _value) public onlyOwner {
        bytes memory payload = abi.encodeWithSignature(
            "transfer(address,uint256)",
            owner(),
            _value
        );

        (bool success, bytes memory returnData) = tokenAddress.call(payload);
        require(success, "Token contract call failed");

        bool transferSuccess = abi.decode(returnData, (bool));
        require(transferSuccess, "Token transfer failed");
    }
}
