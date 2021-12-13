const MyToken = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });

const chai = require("./setupChai.js");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("MyToken", async (accounts) => {
	const [owner, user1] = accounts;

	beforeEach(async () => {
		this.token = await MyToken.new(process.env.INITIAL_TOKENS);
	});

	it("should assign all tokens to my account", async () => {
		const myToken = this.token;
		const totalSupply = await myToken.totalSupply();
		const balance = myToken.balanceOf(owner);
		return expect(balance).to.eventually.be.a.bignumber.equal(totalSupply);
	});
	it("should transfer tokens", async () => {
		const myToken = this.token;
		const totalSupply = await myToken.totalSupply();
		const amount = new BN(500);
		await myToken.transfer(user1, amount, { from: owner });
		const balance1 = myToken.balanceOf(user1);
		const balance2 = myToken.balanceOf(owner);
		expect(balance1).to.eventually.be.a.bignumber.equal(amount);
		return expect(balance2).to.eventually.be.a.bignumber.equal(totalSupply.sub(amount));
	});
	it("should not send more tokens than available", async () => {
		const myToken = this.token;
		const totalSupply = await myToken.totalSupply();
		const amount = totalSupply.add(new BN(1));
		expect(myToken.transfer(user1, amount, { from: owner })).to.eventually.be.rejectedWith("revert");
		return expect(myToken.balanceOf(user1)).to.eventually.be.a.bignumber.equal(new BN(0));
	});
});
