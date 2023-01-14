const API_KEY = "www"; // replace with your api-key
const WALLET_NAME = "XXX"; // replace with your wallet you wish to use
const WALLET_PASSPHRASE = "YYY"; // replace with your wallet passphrase or password

const { WalletClient, NodeClient } = require("hs-client");
const { Network } = require("hsd");
const { promises: ThePromises } = require("fs");

/** @type {import('hsd/lib/protocol/network')} */
const network = Network.get("main");

const nodeClient = new NodeClient({
  port: network.rpcPort,
  apiKey: API_KEY,
});

const walletClient = new WalletClient({
  port: network.walletPort,
  apiKey: API_KEY,
});

const wallet = walletClient.wallet(WALLET_NAME);

(async () => {
  await nodeClient.open();
  await walletClient.open();

  await walletClient.execute("selectwallet", [WALLET_NAME]);
  await wallet.unlock(WALLET_PASSPHRASE, 60);

  // bulk bid auctions
  {
    const tldsList = await ThePromises.readFile("./bid-names.txt", "utf-8");
    const dnames = tldsList.split(/\r?\n/);
    const names = [];
    for (const name of dnames) {
      names.push(name);
    }

    const nBatch = 1; // # of batch
    const tldsPerBatch = 100; // tlds per batch
    let count = 0;
    for (let i = 0; i < nBatch; i++) {
      const batch = [];
      for (let j = 0; j < tldsPerBatch; j++) {
        batch.push(
          // specify or activate number of bids each name in HNS
          ["BID", names[count], 1000, 1000]
          // ['BID', names[count], 500, 500],
          // ['BID', names[count], 100, 100],
          // ['BID', names[count], 50, 50],
          // ['BID', names[count], 10, 10]
        );
        count++;
      }
      await walletClient.execute("sendbatch", [batch]);
      console.log("Batching~: ", [batch]);
      // console.log(await walletClient.execute('createbatch', [batch]));
      console.log(await walletClient.execute("sendbatch", [batch]));
      // console.log([batch]);
    }
  }
  await walletClient.close();
  await nodeClient.close();
})();
