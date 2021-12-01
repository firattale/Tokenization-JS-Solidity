const MyToken = artifacts.require("MyToken.sol");
const MyTokenSale = artifacts.require("MyTokenSale.sol");

module.exports = async function (deployer) {
	const addres = await web3.eth.getAccounts();
	await deployer.deploy(MyToken, 1000000);
	await deployer.deploy(MyTokenSale, 1, addres[0], MyToken.address);
	const token = await MyToken.deployed();
	await token.transfer(MyTokenSale.address, 1000000);
};
