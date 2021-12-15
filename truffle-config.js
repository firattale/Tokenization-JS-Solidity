const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({ path: "../.env" });

const mnemonic = process.env.MNEMONIC,
const accountIndex = 0;

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		develop: {
			port: 8545,
		},
		ganache_local:{
			provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "http://127.0.0.1:8545",
          addressIndex: 0,
        }),
      network_id: '5777',
		}
	},
	compilers: {
		solc: {
			version: "^0.8.0",
		},
	},
};
