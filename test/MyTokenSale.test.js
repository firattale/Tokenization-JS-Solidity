const MyTokenSale = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("MyTokenSale Test", async (accounts) => {
	const [owner, user1] = accounts;

	it("should not have any tokens in my owner account", async () => {
		const instance = await MyToken.deployed();
		return expect(await instance.balanceOf(owner)).to.be.a.bignumber.equal(new BN(0));
	});

	it("all tokens should be in MyTokenSale Smart Contract by default ", async () => {
		const instance = await MyToken.deployed();
		const balanceOfTokenSaleSmartContract = await instance.balanceOf(MyTokenSale.address);
		const totalSupply = await instance.totalSupply();
		return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
	});
	it("should be possible to buy tokens", async () => {
		let tokenInstance = await MyToken.deployed();
		let tokenSaleInstance = await MyTokenSale.deployed();
		let balanceBeforeAccount = await tokenInstance.balanceOf.call(owner);

		await tokenSaleInstance.sendTransaction({
			from: owner,
			value: web3.utils.toWei("1", "wei"),
		});

		const afterBalance = await tokenInstance.balanceOf.call(owner);

		return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(afterBalance);
	});
});
