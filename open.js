const API_KEY = "www"; // replace WWW with your api-key example: 4099a42a8e5b874a0adc186854155d65d91f7efd
const WALLET_NAME = "XXX"; // replace XXX with your wallet you wish to use example: richwallet
const WALLET_PASSPHRASE = "YYY"; // replace YYY with your wallet passphrase or password example: c@#:H7MF U^?.Sh3%^&*

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

  // bulk open auctions
  {
    const tldsList = await ThePromises.readFile("./open-names.txt", "utf-8");
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
        batch.push(["OPEN", names[count++]]);
      }
      // console.log(await walletClient.execute('createbatch', [batch]));
      console.log(await walletClient.execute("sendbatch", [batch]));
      // console.log([batch]);
    }
  }
  await walletClient.close();
  await nodeClient.close();
})();
