import { expect } from "chai";
import { ethers } from "hardhat";

describe("Quest08", () => {
  it("Should unlock Vault Contract", async () => {
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(ethers.utils.formatBytes32String("Vault"));
    await vault.deployed();
    console.log("vault.address:", vault.address);

    const password = await ethers.provider.getStorageAt(vault.address, 1);
    await vault.unlock(ethers.utils.hexValue(password));

    expect(await vault.locked()).to.equal(false);
  });
});
