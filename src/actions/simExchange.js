import store from '../store';
import abi from '../util/MarketContractABI';
import { getBids, getAsks} from '../util/utils';
import OrderLib from '../build/contracts/OrderLib';

const contract = require('truffle-contract');


export function selectContract(contract) {
  return function(dispatch) {
    dispatch({ type: 'SELECTED_CONTRACT', payload: contract });
  };
}

export function tradeOrder(order) {
  const type = 'TRADE_ORDER';
  const web3 = store.getState().web3.web3Instance;

  return async function(dispatch) {
    dispatch({ type: `${type}_PENDING` });

    if (web3 && typeof web3 !== 'undefined') {
      const contract_address = store.getState().simExchange.contract.key;
      const marketContract = web3.eth.contract(abi).at(contract_address);

      const orderLib = contract(OrderLib);
      orderLib.setProvider(web3.currentProvider);
      let orderLibInstance = await orderLib.deployed();

      // here are active bids and aks from our bot account - note the bot account still needs to
      // deposit collateral in order for these orders to be executed against.
      const activeBids = await getBids(web3, marketContract, orderLibInstance);
      const activeAsks = await getAsks(web3, marketContract, orderLibInstance);
      console.log(activeBids);

      const orderToTrade = activeAsks[0];
      await marketContract.tradeOrder(
        orderToTrade.orderAddresses,
        orderToTrade.unsignedOrderValues,
        orderToTrade.orderQty,                  // qty is five
        -1,          // let us fill a one lot
        orderToTrade.v,  // v
        orderToTrade.r,  // r
        orderToTrade.s,  // s
        {from: web3.eth.accounts[0]}
      );

      // NOTE: this is a very rough example of how this could all work.  Essentially the user selects an order object
      // to trade against and calls trade order from their account.

      dispatch({ type: `${type}_FULFILLED`, payload: order });
    } else {
      dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
    }
  };
}
