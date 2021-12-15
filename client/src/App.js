import React, { useState, useEffect } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokensale.json";
import KYC from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
	const [loaded, setLoaded] = useState(false);
	const [kycAddress, setKycAddress] = useState("");
	const [state, setState] = useState({});
	useEffect(() => {
		try {
			async function fetchWeb3() {
				// Get network provider and web3 instance.
				const web3 = await getWeb3();

				// Use web3 to get the user's accounts.
				const accounts = await web3.eth.getAccounts();

				// Get the contract instance.
				const networkId = await web3.eth.net.getId();
				const tokenInstance = new web3.eth.Contract(MyToken.abi, MyToken.networks[networkId]?.address);

				const tokenSaleInstance = new web3.eth.Contract(MyTokenSale.abi, MyTokenSale.networks[networkId]?.address);
				const kycInstance = new web3.eth.Contract(KYC.abi, KYC.networks[networkId] && KYC.networks[networkId].address);
				setState({
					accounts,
					tokenInstance,
					tokenSaleInstance,
					kycInstance,
					tokenSaleAddress: MyTokenSale.networks[networkId]?.address,
				});
				// Set web3, accounts, and contract to the state, and then proceed with an
				// example of interacting with the contract's methods.
				setLoaded(true);
			}
			fetchWeb3();
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	}, []);
	const handleInputChange = (e) => {
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		setKycAddress(value);
	};

	const handleKycWhitelisting = async () => {
		const { kycInstance, accounts } = state;
		await kycInstance.methods.isAllowed(kycAddress).send({ from: accounts[0] });
		alert("KYC whitelisting successful for " + kycAddress);
	};

	if (!loaded) {
		return <div>Loading Web3, accounts, and contract...</div>;
	}
	return (
		<div className="App">
			<h1>Token Sale</h1>
			<p>Get your tokens today.</p>
			<h2>Kyc Whitelisting</h2>
			Address to allow: <input type="text" name="kycAdress" value={kycAddress} onChange={handleInputChange} />
			<button type="button" onClick={handleKycWhitelisting}>
				Add to Whitelist
			</button>
			<h2>Buy Tokens</h2>
			<p>If you want to token sent wei to this address: {state.tokenSaleAddress}</p>
		</div>
	);
};

export default App;
