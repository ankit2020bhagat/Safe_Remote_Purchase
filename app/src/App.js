import './App.css';
import React, { useState } from 'react'
import { ethers } from "ethers";
import contractAbi from './artifacts/contracts/Remote_Purchase.sol/Remote_Purchase.json';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
	// console.log(contractAbi.abi);
	const [buyer, setSeller] = useState(null);
    const [purchase_Amount,setpurchase_Amount]=useState(null);


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
		console.log(purchase_Amount)
		const lockedAmount = ethers.utils.parseEther(purchase_Amount);
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
		console.log("contract Balance:", contractBalance.toString());



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
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
		const transaction_confirmRecieved = await contract.confirmRecieved();
		await transaction_confirmRecieved.wait();
		const contractBalance = await contract.getBalanceof();
		console.log("contract address:", contractBalance.toString());

	}
	async function paySeller() {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
		const transaction_paySeller = await contract.paySeller();
		await transaction_paySeller.wait();
	}

	async function abort() {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
		const transaction_abort = await contract.abort();
		await transaction_abort.wait();
	}
	// useEffect(() => {
	// 	requestAccount();
	// 	getfunction();
	// 	ConfirmPurchase();
	// 	getFunction1();
	// 	confirmRecieved();
	// 	paySeller();
	// }, []);
	// requestAccoun();ConfirmPurchase
	// ConfirmPurchase();

	return (
		<div className="App">
			<h1>
				Safe Remote Purchase
				<br />
				Buyer Account :{buyer}
				<br />
			</h1>
			<Button onClick={requestAccount}>Connect_To_Metamask</Button>
			<br />
			<Button onClick={getfunction} variant="success">Get_function</Button>
			<br />
			<input type="text" onChange={(event)=>setpurchase_Amount(event.target.value)}></input>
			<Button variant="secondary" onClick={ConfirmPurchase}>ConfirmPurchase</Button>
			<br />
			<Button variant="danger" onClick={getFunction1}>getFunction1</Button>
			<br />
			<Button variant="warning" onClick={confirmRecieved}>confirmRecieved</Button>
			<br />
			<Button variant="info" onClick={paySeller}>PaySeller</Button>
			<br />
			<Button variant="danger" onClick={abort}>Abort</Button>
		</div>
	);
}

export default App;
