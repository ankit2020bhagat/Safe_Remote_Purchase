const hre = require("hardhat");
const { expect } = require("chai");
describe("Safe_Remote_Purchase", function () {
    let seller, buyer, deployContract, buy_amount, contract_Balance
    it("Contract Deployement", async function () {
        [seller, buyer] = await ethers.getSigners();
        console.log("Seller Adress", seller.address)
        console.log("Buyer Adress", buyer.address);
        const lockedAmount = hre.ethers.utils.parseEther("4");
        const mainContract = await ethers.getContractFactory("Remote_Purchase");
        deployContract = await mainContract.deploy({ value: lockedAmount });
        buy_amount = hre.ethers.utils.parseEther("4");
        await deployContract.deployed();
        console.log("Contract Address", deployContract.address);

        let seller_balance = await hre.ethers.provider.getBalance(seller.address);

        console.log('seller balance :', seller_balance.toString());
        contract_Balance = await hre.ethers.provider.getBalance(deployContract.address);

        console.log('seller balance :', contract_Balance.toString());

    })

    it("Confirm_Purchase", async function () {
        const transaction_ConfirmPurchase = await deployContract.connect(buyer).ConfirmPurchase({ value: buy_amount });
        await transaction_ConfirmPurchase.wait();
        let buyer_balance = await hre.ethers.provider.getBalance(buyer.address);

        console.log('Buyer balance :', buyer_balance.toString());

        contract_Balance = await hre.ethers.provider.getBalance(deployContract.address);

        console.log('Contract balance :', contract_Balance.toString());
    })

    it("Confirm Recieved", async function () {
        const transaction_confirmRecieved = await deployContract.connect(buyer).confirmRecieved();
        await transaction_confirmRecieved.wait();
        let buyer_balance = await hre.ethers.provider.getBalance(buyer.address);

        console.log('Buyer balance :', buyer_balance.toString());


    })

    it("Pay Seller", async function () {
        const transaction_paySeller = await deployContract.connect(seller).paySeller();
        await transaction_paySeller.wait();
        let seller_balance = await hre.ethers.provider.getBalance(seller.address);

        console.log('seller balance :', seller_balance.toString());
        contract_Balance = await hre.ethers.provider.getBalance(deployContract.address);

        console.log('seller balance :', contract_Balance.toString());

    })

    it("Abort Contract", async function () {
        const transaction_abort = await deployContract.abort();

        await transaction_abort.wait();
    })


})
//async function main() {




//   




//   
//   
//   const contractBalance = await deployContract.getBalanceof();
//   console.log("contract Balance:", contractBalance.toString());

// }

// main();