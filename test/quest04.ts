import { expect } from "chai";
import { ethers } from "hardhat";

describe("Quest04", function () {
  it("Should takeover Telephone contract", async function () {
    const [owner, user1] = await ethers.getSigners();

    const Telephone = await ethers.getContractFactory(
      "contracts/Telephone.sol:Telephone"
    );
    const telephone = await Telephone.deploy();
    await telephone.deployed();

    console.log("telephone.address:", telephone.address);

    expect(await telephone.owner()).to.equal(owner.address);

    const Quest = await ethers.getContractFactory("Quest04");
    const quest = await Quest.deploy();
    await quest.deployed();

    console.log("quest04.address:", quest.address);

    const takeoverTX = await quest.takeover(telephone.address, user1.address);
    await takeoverTX.wait();

    expect(await telephone.owner()).to.equal(user1.address);
  });
});
