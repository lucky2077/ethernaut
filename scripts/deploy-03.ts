import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const Quest03 = await ethers.getContractFactory("Quest03");
  const quest = await Quest03.deploy();

  await quest.deployed();

  console.log("Quest03 deployed to:", quest.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
