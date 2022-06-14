import { expect } from "chai";
import { ethers } from "hardhat";

describe("Quest11", () => {
  it("Should go to top floor", async () => {
    const Elevator = await ethers.getContractFactory("Elevator");
    const elevator = await Elevator.deploy();
    await elevator.deployed();
    console.log("Elevator address:", elevator.address);

    const Quest11 = await ethers.getContractFactory("Quest11");
    const quest11 = await Quest11.deploy();
    await quest11.deployed();
    console.log("Quest11 address:", quest11.address);

    const TX = await quest11.goTo(elevator.address, 1);
    await TX.wait();

    expect(await elevator.top()).to.equal(true);
  });
});
