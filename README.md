<img src="https://image.ibb.co/nANcyR/logo_MARKET_banner_2.png" align="middle">

[![Build Status](https://api.travis-ci.org/MarketProject/Dapp.svg?branch=master)](https://travis-ci.org/MarketProject/Dapp)

# MarketProtocol Dapp
Decentralized blockchain application utilizing [MARKET](https://github.com/MarketProject/MarketProtocol)

Take a look at our [FAQ](https://github.com/MarketProject/MarketProtocol/wiki/Frequently-Asked-Questions) for a little more explanation.

## Getting Started
Assuming you have npm already, Install truffle
```
$ npm install -g truffle
```
Clone this repository and use npm to install needed dependencies
```
$ git clone https://github.com/MarketProject/Dapp.git
$ cd Dapp
$ npm install
```
At this point you can start the truffle development environment
```
$ truffle develop
```

From here, you now need to bring up the ethereum bridge for the Oraclize.it service.  Instructions for installation can be found [here](https://github.com/MarketProject/ethereum-bridge) 

start the ethereum bridge (in a separate console) to run connected
to the truffle development environment you have created
```
$ cd ethereum-bridge/
$ node bridge -H localhost:9545 -a 9 --dev
```
Once the bridge has fully initialized, you should be able to run the example migrations for the MARKET smart contracts.

```
truffle(develop)> migrate
```
If this fails due to a `revert` , please be sure the bridge is listening prior to attempting the migration.

Now we can bring Dapp with the commands below

```
$ cd Dapp
$ npm run start
```
## DApp Features

### Mainnet (eventually)
* Contract Explorer : will allow users ability to view, filter, and sort deployed and white listed MARKET contracts available for trading
* Contract Deployer : Intuitive user interface to help users select appropiate variables for deployment of their custom MARKET contracts.
* Query Tester : Simple ability to create a query and retrieve the results from the blockchain in order to test query structure and expected results prior to deploying a contract.
* Address lookup : Reverse contract lookup for MARKET contracst already deployed.  Will allow users to enter an address and retrieve pertinent variables as well as the contract's current status.

### Testnet only
* Simulated Exchange : Users will register using their email address that will be used for tracking of simulated earnings for contest rewards, future airdrops, and project udpates.  This game or sim, will allow users to trade against an automated bot that trades a few different MARKET contracts while making or losing tokens that keep score in the competition.
