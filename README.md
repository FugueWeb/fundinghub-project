# FundingHub-Project dApp

Github repo at [https://github.com/FugueWeb/fundinghub-project](https://github.com/FugueWeb/fundinghub-project).

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
* Create a project by filling out the fields (name, description, owner address, funding goal, and deadline). Time (in minutes) is converted to human readable date. Funding goal is in Ether, not Wei. Once project is created, the tx is logged in the "Transaction Info" table and the project is added to the "Browse Projects" table. Add as many projects as you want and they'll be added to the list.
* Contribute to a project by choosing one of the available project addresses and selecting an amount in Ether. A "ca-ching" noise will sound when you contribute and the tx is logged.
* All available address from the running RPC will display at the bottom and in the console.

## Test

* `truffle test` creates a project and checks the refund function

## Screenshot

![alt text](https://github.com/FugueWeb/fundinghub-project/raw/master/app/images/screenshot.png "App Preview")

## Issues / ToDo

* Improve overall functionality, especially taking advantage of `Events()` and more of the `Project` capabilities.


