# FundingHub-Project dApp

Requires [Truffle 2.0](http://truffle.readthedocs.io/en/latest/getting_started/installation/), NodeJS, and Geth RPC

Decentralized crowd funding dApp with front end. Two contracts deployed (`FundingHub.sol` and `Project.sol`) that allow creates projects to be funded and stores them as a registry.

## Getting started

* Open two terminals (one for Truffle, the other for Geth)
* T1: `truffle compile`
* T2: run `testrpc -a 2` or use the testnet at `geth --testnet --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,web3" console` (for example)
* Make sure your account is unlocked for sending transactions (`personal.unlockAccount(eth.accounts[0])`), enter password
* `truffle migrate` (Migrations, FundingHub, and Project contracts deployed)
* `truffle build`
* `truffle serve`

## Interact with the dApp


## Screenshot

![alt text](https://github.com/FugueWeb/fundinghub-project/raw/master/app/images/screenshot.png "App Preview")

## Issues / ToDo

* Improve functionality


