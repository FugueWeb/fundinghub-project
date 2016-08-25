# FundingHub-Project dApp

Requires [Truffle 2.0](http://truffle.readthedocs.io/en/latest/getting_started/installation/), NodeJS, and Geth RPC

Front end for Ethereum video tutorial from [shlomi zeltsinger](https://www.youtube.com/channel/UCi9Mf3veSDDIMdGGtPmPu1g) - @Shultzi on Github. Model for a user to interact with a provider service, for instance, a client (`User`) registering an account with an electric company (`Provider`). The provider can then set the debt of the user for services, and the user can pay that debt and unsubscribe when they have a 0 balance. The dApp also shows what addresses are available in the running `geth` node, balances, and some transaction information.

## Getting started

* Open two terminals (one for Truffle, the other for Geth)
* T1: `truffle compile`
* T2: `geth --testnet --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,web3" console` (for example)
* Unlock your account for sending transactions (`personal.unlockAccount(eth.accounts[0])`) and enter password
* `truffle migrate` (Migrations, mortal, User, and Provider contracts deployed)

## Interact with the dApp

* Copy Provider address into the `Register Provider` field and click send.
* Copy User address into the `Set Debt` field and set a debt, then click send. Note, setting debt as the Provider does not use addition. It only sets the total debt of the User.
* Try to `unsubscribe` now. It's not possible if the debt is greater than 0.
* Send ether back to Provider. Note, this does not automatically update the User debt. Still work to do here.
* Ensure User debt is set to 0 and try to unsubscribe from the Provider.

## Screenshot

![alt text](https://github.com/FugueWeb/user-provider/raw/master/app/images/screenshot.png "App Preview")

## Issues / ToDo

* Create new Provider instances. In `truffle`, this should be possible with `Provider.new().then(...)` but I am getting similar errors/warnings (and no new address of a deployed contract being returned).
* For provider name and description, save only the IPFS hash that points to a user-friendly description of the service.
* Experiment with the userName being saved in a name registry.


