const MyToken = artifacts.require("MyToken");

const chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("MyToken", async (accounts) => {
	it("should assign all tokens to my account", async () => {
		const myToken = await MyToken.deployed();
		const totalSupply = await myToken.totalSupply();
		const balance = myToken.balanceOf(accounts[0]);
		expect(balance).to.eventually.be.bignumber.equal(totalSupply);
	});
});
