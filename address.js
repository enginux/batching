let account;
account = "default";
const { WalletClient } = require("hs-client");
const { Network } = require("hsd");

/** @type {import('hsd/lib/protocol/network')} */
const network = Network.get("main");

const walletOptions = {
  port: network.walletPort,
  apiKey: "WWW", // replace with your api-key
};

const walletClient = new WalletClient(walletOptions);

(async () => {
  const adrs = 5000; // replace number addresses you wish to generate
  for (let i = 0; i < adrs; i++) {
    const result = await walletClient.execute("getnewaddress", [account]);
    console.log(result);
  }
})();
