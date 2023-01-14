## **Featuring HSD v5 New RPC methods** [**#686**](https://github.com/handshake-org/hsd/pull/686)

- **createbatch**  and **sendbatch** create batch transactions with any number of outputs with any combination of covenants.
- we'll use it open and/or bid by batch aka. Bulk.

Requirements to use the tool:

- PC with node [\>= 14.0.0](https://github.com/handshake-org/hsd/blob/6314c1aa08484be6d304d251b7f309f6e6a664ac/package.json#L20)
- CMD/CLI
- [Bob Wallet](https://github.com/kyokan/bob-wallet/releases) for GUI
- [Palmreader Wallet](https://github.com/enginux/palmreader) for CLI
- Install `npm install -g hs-client`

## **Let's get started**,

This tutorial utilizes Palmreader combined with Bob in SPV mode because its lite weight.

Step 1: Download the code **batching** and extract the files.

Step 2: Download Palmreader and Bob(if your Bob version isn't batching capable, you need to build it from the source) then extract the code.

- Go to folder **palmreader** > **bin** > **(put all the batching codes)** from Step 1.
- Go to folder **pamreader**, open a CLI/CMD inside it and install HSD with batching features `npm install handshake-org/hsd#master`
- Go to folder **bob-wallet**, open a CLI/CMD inside it and install HSD with batching features `npm install handshake-org/hsd#master`


## To **open a batch auctions**

Step 3: Open Bob in SPV with the wallet credentials you wish to use

To Enable SPV mode, go to **Settings** > **Network & Connections** > **SPV Node(Enable)** then restart Bob.

Step 4: Go to file open.js and edit and replace the following with your own,

- replace **WWW** with your api-key, example: 4099a24a8e5b874a0adc186854155d65d91f7efd

To get you api-key in Bob, go to **Settings** > **Wallet** > **View API Key**

- replace **XXX** with your wallet you wish to use, example: wealthiestwallet
- replace **YYY** with your wallet passphrase or password, example: c@#:H7MF U^?.Sh3%^&\*

Step 5: Now everything is set-up; we can batch transactions.

Put your desired names you wish to auction inside **open-names.txt** file accordingly based on how it is laid out in the provided sample.

Step 6: Open a CLI in **palmreader** > **bin** > **(open a CLI/CMD inside)** then type **./pamreader** press **Enter.** Choose **(B)ob** and **(S)PV client** then press **Enter** key. Palmreader will load.

Step 7: From the **Wallet List (W)** choose your desired wallet for this task.

Step 8: Open a CLI in **palmreader** > **bin** > **(open a CLI/CMD inside)** then type `node open.js` and press **Enter**. This will batch open 100 of your names inside the open-names.txt file.

Step 9: In Palmreader **Debug Log** window monitor and you'll see a keyword " **sending…**" wait until it's done.

Step 10: After a few seconds( more or less 40), your batch open transaction is now finally "**served…**" based on the monitor **Debug Log** or **Wallet History** palmreaderwindows.

Step 11: Inside **open-names.tx** t delete or remove the first 100 so that next following names can be open. Save the edited file and execute the same sequence in Step 8. **Repeat until all your names are successfully opened**.

Step 12: Closed palmreader by pressing **Ctrl+C** or **Q**.

Step 13: Go to **Bob Wallet with your wallet credentials** being used. You can check transactions being done there. When everything isn't grayed and totally black means 6 hours have passed and you can now Bid the names you batch opened lately.


## To **bid a batch auctions**

Step 14: **Batch Bid all your opened names**. Go to Step 4 and fill with your wallet credentials you wish to use for this task.

Step 15: **Copy** all the opened names from the open-names.txt file and **Paste** it inside the bid-names.txt file and **Save**.

Step 16: Open a CLI in **palmreader** > **bin** > **(open a CLI/CMD inside)** then type `node bid.js` and press **Enter**. This will batch bid 100 of your names inside the bid-names.txt file.

Step 17: You will expect the same process as Step 9, 10, 11, 12 and 13. Delete the already bid names so that it will not duplicate and vice-versa.

Step 18: Use Bob Wallet to bulk **Reveal**, **Redeem**, **Register** and **Transfer**.

**Bonus:**

 Step 19:

- To bulk renew. Just bulk **Transfer** all your names into a new wallet passphrase.
- Create multiple wallets and diversify.
- For bulk open wallets. Limit it up-to 4K fresh transactions.
- For bulk bid wallets. Limit it up-to 5K fresh transactions.
- For vault wallet(means secured and doesn't transact or connect to third party softwares). Limit it up-to 10K names.
- If your wallet didn't sync (stacked at certain %), probably it's broken. Select your wallet in palmreader and execute the code `node address.js`. When done, **restart** palmreader.
- Use Bob Multisig. Means your multiple wallet accounts will approve a certain transaction.

## Contributing
Contributions are welcome!

## Credits
Thanks to these awesome people for providing the codes:
- [Rithvik Vibhu](https://github.com/rithvikvibhu)
- [Matthew Zipkin](https://github.com/pinheadmz)

and to all HSD hardcore dev \o/