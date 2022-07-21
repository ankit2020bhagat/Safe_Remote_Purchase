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
   

    const seller_balance = await deployContract.BalanceofSeller();
    console.log('seller balance :', seller_balance.toString());
    // const transaction_abort = await deployContract.abort();

    // await transaction_abort.wait();

    const seller_balance1 = await deployContract.BalanceofSeller();
    console.log('seller balance :', seller_balance1.toString());

    const transaction_ConfirmPurchase = await deployContract.connect(buyer).ConfirmPurchase({ value: buy_amount });
    await transaction_ConfirmPurchase.wait();
    const buyer_balance = await deployContract.Balanceofbuyer();
    console.log('buyer balance :', buyer_balance.toString());
    console.log("buyer address: ", await deployContract.buyer())
    const transaction_confirmRecieved = await deployContract.connect(buyer).confirmRecieved();
    await transaction_confirmRecieved.wait();
    const transaction_paySeller = await deployContract.connect(seller).paySeller();
    await transaction_paySeller.wait();
    const contractBalance = await deployContract.getBalanceof();
    console.log("contract Balance:", contractBalance.toString());

    







}

main();