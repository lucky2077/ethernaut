import { expect } from "chai";
import { ethers } from "hardhat";

describe("Quest03", function () {
  it("Should always win the guess", async function () {
    const CoinFlip = await ethers.getContractFactory(
      "contracts/CoinFlip.sol:CoinFlip"
    );
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();
    console.log("coinFlip.address:", coinFlip.address);

    const Quest03 = await ethers.getContractFactory("Quest03");
    const quest03 = await Quest03.deploy();
    await quest03.deployed();

    console.log("quest03.address:", quest03.address);

    for (let index = 0; index < 100; index++) {
      const guessTX = await quest03.guess(coinFlip.address);
      await guessTX.wait();

      expect(await coinFlip.consecutiveWins()).to.equal(index + 1);
    }
  });
});
