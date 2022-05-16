import { expect } from "chai";
import { ethers } from "hardhat";
import { King, Quest09 } from "../typechain";

describe("Quest09", () => {
  let king: King;
  let quest: Quest09;

  it("Should deploy King with 0.1ether", async () => {
    const King = await ethers.getContractFactory("King");
    king = await King.deploy({ value: ethers.utils.parseEther("0.1") });
    await king.deployed();

    console.log("King address:", king.address);

    expect(await ethers.provider.getBalance(king.address)).to.equal(
      ethers.utils.parseEther("0.1")
    );
  });

  it("Should deploy Quest09 with 0.1ether", async () => {
    const Quest09 = await ethers.getContractFactory("Quest09");
    quest = await Quest09.deploy({ value: ethers.utils.parseEther("0.1") });
    await king.deployed();

    console.log("Quest09 address:", quest.address);

    expect(await ethers.provider.getBalance(quest.address)).to.equal(
      ethers.utils.parseEther("0.1")
    );
  });

  it("Should quest become King's king", async () => {
    await quest.attack(king.address, { gasLimit: 1000000 });

    expect(await king._king()).to.equal(quest.address);
  });

  it("Should quest always be King's king", async () => {
    const [owner] = await ethers.getSigners();
    console.log("Owner address:", owner.address);

    await expect(
      owner.sendTransaction({
        to: king.address,
        value: ethers.utils.parseEther("0.2"),
      })
    ).to.be.revertedWith("I don't accept any ether sends to me");
  });
});
