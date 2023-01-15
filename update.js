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

// ref: https://hsd-dev.org/api-docs/#send-update
type='TXT'
key='txt'
value='UNITED WE SHAKE!'
const data = {records: []};
const record = {type};
record[key] = [value];
data.records.push(record);

(async () => {
  await nodeClient.open();
  await walletClient.open();

  await walletClient.execute("selectwallet", [WALLET_NAME]);
  await wallet.unlock(WALLET_PASSPHRASE, 60);

  // bulk update
  {
    const tldsList = await ThePromises.readFile("./update-names.txt", "utf-8");
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
        batch.push(["UPDATE", names[count++], data]); // ref: https://github.com/handshake-org/hsd/blob/6314c1aa08484be6d304d251b7f309f6e6a664ac/lib/wallet/rpc.js#L2577
      }
      // console.log(await walletClient.execute('createbatch', [batch]));
      console.log(await walletClient.execute("sendbatch", [batch]));
      // console.log([batch]);
    }
  }
  await walletClient.close();
  await nodeClient.close();
})();