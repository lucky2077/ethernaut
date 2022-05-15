import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const Quest = await ethers.getContractFactory("Quest07");
  const quest = await Quest.deploy();

  await quest.deployed();

  console.log("Quest07 deployed to:", quest.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
