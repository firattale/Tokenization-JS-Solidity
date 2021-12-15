const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const MyKycContract = artifacts.require("KycContract");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
	const addres = await web3.eth.getAccounts();
	await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
	await deployer.deploy(MyKycContract);
	await deployer.deploy(MyTokenSale, 1, addres[0], MyToken.address, MyKycContract.address);
	const token = await MyToken.deployed();
	await token.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
