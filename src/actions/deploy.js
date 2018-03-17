import contract from 'truffle-contract';
import moment from 'moment';
import { BigNumber } from 'bignumber.js';

export function deployContract(
  { web3, contractSpecs },
  { MarketContractRegistry, MarketContract, MarketCollateralPool, MarketToken },
) {
  const type = 'DEPLOY_CONTRACT';

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });

    // Double-check web3's status
    if (web3 && typeof web3 !== 'undefined') {
      // Using truffle-contract create needed contract objects and set providers
      const marketContractRegistry = contract(MarketContractRegistry);
      marketContractRegistry.setProvider(web3.currentProvider);

      const marketContract = contract(MarketContract);
      marketContract.setProvider(web3.currentProvider);

      const marketCollateralPool = contract(MarketCollateralPool);
      marketCollateralPool.setProvider(web3.currentProvider);

      const marketToken = contract(MarketToken);
      marketToken.setProvider(web3.currentProvider);

      // create array to pass to MARKET contract constructor
      const contractConstructorArray = [
        contractSpecs.priceFloor,
        contractSpecs.priceCap,
        contractSpecs.priceDecimalPlaces,
        contractSpecs.qtyMultiplier,
        contractSpecs.expirationTimeStamp
      ];

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any
        if (error) {
          console.error(error);
        }

        console.log('Attempting to deploy contract from ' + coinbase);

        // find the address of the MKT token so we can link to our deployed contract
        let marketContractInstanceDeployed;

        marketToken
          .deployed()
          .then(function(marketTokenInstance) {
            return marketContract.new(
              contractSpecs.contractName,
              marketTokenInstance.address,
              contractSpecs.baseTokenAddress,
              contractConstructorArray,
              contractSpecs.oracleDataSource,
              contractSpecs.oracleQuery,
              contractSpecs.oracleQueryRepeatSeconds,
              {
                gas: 6385876, // TODO : Remove hard-coded gas
                value: contractSpecs.preFunding,
                gasPrice: web3.toWei(1, 'gwei'),
                from: coinbase,
              }
            );
          })
          .then(function(marketContractInstance) {
            marketContractInstanceDeployed = marketContractInstance;
            return marketCollateralPool.new(marketContractInstance.address, {
              gas: 5100000,
              gasPrice: web3.toWei(1, 'gwei'),
              from: coinbase
            });
          })
          .then(function(marketCollateralPoolInstance) {
            return marketContractInstanceDeployed.setCollateralPoolContractAddress(
              marketCollateralPoolInstance.address, {
                from: coinbase,
                gasPrice: web3.toWei(1, 'gwei')
              }
            );
          })
          .then(function() {
            return marketContractRegistry.deployed();
          })
          .then(function(marketContractRegistryInstance) {
            marketContractRegistryInstance.addAddressToWhiteList(
              marketContractInstanceDeployed.address,
              {
                from: web3.eth.accounts[0],
                gasPrice: web3.toWei(1, 'gwei')
              }
            );

            dispatch({ type: `${type}_FULFILLED`, payload: marketContractInstanceDeployed });
          })
          .catch(err => {
            dispatch({ type: `${type}_REJECTED`, payload: err });
          });
      });
    } else {
      dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
    }
  };
}

export function handlePreFunding(
  { web3, changedValues, contractData },
  { QueryTest },
) {
  const type = 'CALCULATE_PREFUNDING';

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });

    console.log(changedValues);
    console.log(contractData);

    if (web3 && typeof web3 !== 'undefined') {
      if (contractData['oracleDataSource']
        && contractData['oracleQueryRepeatSeconds']
        && contractData['expirationTimeStamp']) {

          const queryTest = contract(QueryTest);
          queryTest.setProvider(web3.currentProvider);

          queryTest.deployed().then(async function(queryTestInstance) {
            console.log(queryTestInstance);
            console.log("oracleDataSource", contractData['oracleDataSource']);
            try {
              queryTestInstance.getQueryCost.call(contractData['oracleDataSource']).then(async function(costPerQuery) {
                  const oraclizeCallbackGas = await queryTestInstance.QUERY_CALLBACK_GAS.call();
                  console.log("Cost per query in WEI", costPerQuery.toNumber());
                  console.log("oraclizeCallbackGasNeeded", oraclizeCallbackGas.toNumber());
                  const now = moment();
                  console.log("Now", now.format());
                  console.log("Contract expiration", contractData['expirationTimeStamp'].format());
                  const secondsToExpiration = moment.duration(contractData['expirationTimeStamp'].diff(now)).asSeconds();
                  console.log("Seconds to expiration", secondsToExpiration);
                  const expectedNumberOfQueries = new BigNumber(Math.floor(secondsToExpiration / contractData['oracleQueryRepeatSeconds']));
                  console.log("Expected number of queries", expectedNumberOfQueries);
                  console.log(costPerQuery);
                  console.log(oraclizeCallbackGas);
                  const approxGasRequired = costPerQuery * expectedNumberOfQueries + oraclizeCallbackGas * expectedNumberOfQueries;
                  console.log(approxGasRequired);
                  dispatch({ type: `${type}_FULFILLED`, payload: approxGasRequired.toString() });
              });
            } catch (err) {
              dispatch({ type: `${type}_REJECTED`, payload: {'error': err} });
            }
          });
      } else {
        dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Not all required fields defined'} });
      }
    } else {
      dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
    }
  };
}
