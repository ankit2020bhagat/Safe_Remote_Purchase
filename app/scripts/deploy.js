const hre = require("hardhat");
async function main() {
  const [seller, buyer] = await ethers.getSigners();
  console.log("Seller Adress", seller.address)
  console.log("Buyer Adress", buyer.address);
  const lockedAmount = hre.ethers.utils.parseEther("4");
  const mainContract = await ethers.getContractFactory("Remote_Purchase");
  const deployContract = await mainContract.deploy({ value: lockedAmount });
  const buy_amount = hre.ethers.utils.parseEther("4");
  await deployContract.deployed();
  console.log("Contract Address", deployContract.address);


}

main();