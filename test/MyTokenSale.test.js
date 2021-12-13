const MyTokenSale = artifacts.require("MyTokenSale");
const MyToken = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("MyTokenSale", async (accounts) => {
	const [owner, user1] = accounts;

	it("should not have any tokens in my owner account", async () => {
		const instance = await MyToken.deployed();
		return expect(await instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(new BN(0));
	});
});
