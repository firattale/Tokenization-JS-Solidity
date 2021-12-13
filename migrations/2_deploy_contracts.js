const MyToken = artifacts.require("MyToken.sol");
const MyTokenSale = artifacts.require("MyTokenSale.sol");
require("dotenv").config({ path: "/Users/firat.tale/Desktop/tokenization/test/.env" });

module.exports = async function (deployer) {
	const addres = await web3.eth.getAccounts();
	await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
	await deployer.deploy(MyTokenSale, 1, addres[0], MyToken.address);
	const token = await MyToken.deployed();
	await token.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
