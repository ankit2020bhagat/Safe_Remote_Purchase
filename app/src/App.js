import './App.css';
import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import contractAbi from './artifacts/contracts/Remote_Purchase.sol/Remote_Purchase.json';


const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function App() {
	// console.log(contractAbi.abi);
	const [buyer, setSeller] = useState(null);
	const [sellerBalance, setSellerBalance] = useState(null);
	const [contractBalance, setContractBalance] = useState(null);


	//const signer = provider.getSigner()

	async function requestAccount() {

		const account = await window.ethereum.request({ method: "eth_requestAccounts" });
		setSeller(account);
		// const balance = await provider.getBalance(seller)
		// console.log(balance);
	}
	async function getfunction() {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, provider);
		//console.log(contract);
		try {
			const contractBalance = await contract.getBalanceof();
			console.log("Contract Balance: ", contractBalance.toString());
			const BalanceofSeller = await contract.BalanceofSeller();
			console.log("Seller Blaance", BalanceofSeller.toString());
			console.log("Seller Address:", await contract.seller());

		} catch (err) {
			console.log(err);
		}
	}
	async function ConfirmPurchase() {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
		}
		const lockedAmount = ethers.utils.parseEther("4");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
		// await signer.sendTransaction({
		// 	to:'0x5FbDB2315678afecb367f032d93F642f64180aa3',
		// 	value:lockedAmount
		// })
		const transaction_ConfirmPurchase = await contract.ConfirmPurchase({

			value: lockedAmount,
			gasLimit: 6721975,
			gasPrice: 20000000000,
		});
		await transaction_ConfirmPurchase.wait();
		const contractBalance = await contract.getBalanceof();
		console.log("contract address:", contractBalance.toString());



	}
	async function getFunction1() {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, provider);
		const buyer = await contract.buyer();
		console.log("Buyer Address :", buyer);
		const buyerBalance = await contract.Balanceofbuyer();
		console.log("Buyer Balance :", buyerBalance.toString());

	}
	async function confirmRecieved() {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer=provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
		const transaction_confirmRecieved = await contract.confirmRecieved();
		await transaction_confirmRecieved.wait();
		const contractBalance = await contract.getBalanceof();
		console.log("contract address:", contractBalance.toString());

	}
	async function paySeller() {
		const provider=new ethers.providers.Web3Provider(window.ethereum);
		const signer=provider.getSigner();
		const contract= new ethers.Contract(contractAddress,contractAbi.abi,signer);
		const transaction_paySeller=await contract.paySeller();
		await transaction_paySeller.wait();
	}
	useEffect(() => {
		requestAccount();
		getfunction();
		ConfirmPurchase();
		getFunction1();
		confirmRecieved();
		paySeller();
	}, []);
	// requestAccoun();ConfirmPurchase
	// ConfirmPurchase();

	return (
		<div className="App">
			<h1>
				Safe Remote Purchase
				<br />
				Buyer Account :{buyer}
				<br />
				Seller Balance :{sellerBalance}
				<br />



			</h1>
		</div>
	);
}

export default App;
