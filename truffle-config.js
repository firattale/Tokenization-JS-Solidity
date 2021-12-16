const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({ path: "./.env" });

const mnemonic = process.env.MNEMONIC;
module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		develop: {
			port: 8545,
		},
		ganache_local: {
			provider: () =>
				new HDWalletProvider({
					mnemonic: {
						phrase: mnemonic,
					},
					providerOrUrl: "http://127.0.0.1:7545",
					addressIndex: 0,
				}),
			network_id: "5777",
		},
		goerli_infura: {
			provider: () =>
				new HDWalletProvider({
					mnemonic: {
						phrase: mnemonic,
					},
					providerOrUrl: "https://goerli.infura.io/v3/34f277b88d444a3a9e650f2a1de68d7a",
					addressIndex: 0,
				}),
			network_id: "5",
		},
	},
	compilers: {
		solc: {
			version: "^0.8.0",
		},
	},
};
