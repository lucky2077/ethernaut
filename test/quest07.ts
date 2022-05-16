import { expect } from "chai";
import { ethers } from "hardhat";
describe("Quest07", () => {
  it("Should increase balance of Force.sol", async () => {
    const Force = await ethers.getContractFactory("Force");
    const force = await Force.deploy();
    await force.deployed();
    console.log("force.address:", force.address);

    expect(await ethers.provider.getBalance(force.address)).to.equal(0);

    const Quest07 = await ethers.getContractFactory("Quest07");
    const quest07 = await Quest07.deploy();
    await quest07.deployed();
    console.log("quest07.address:", quest07.address);

    const TX = await quest07.attack(force.address, {
      value: ethers.utils.parseEther("0.1"),
    });
    await TX.wait();

    expect(await ethers.provider.getBalance(force.address)).to.equal(
      ethers.utils.parseEther("0.1")
    );
  });
});
