import store from '../store';
import abi from '../util/MarketContractABI';
import { signMessage, getContractParams } from '../util/utils';

export function selectContract(contract) {
  return function(dispatch) {
    dispatch({ type: 'SELECTED_CONTRACT', payload: contract });
  };
}

export function tradeOrder(order) {
  const type = 'TRADE_ORDER';
  const web3 = store.getState().web3.web3Instance;

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });

    if (web3 && typeof web3 !== 'undefined') {
      const contract_address = store.getState().simExchange.contract.key;
      const contract = web3.eth.contract(abi).at(contract_address);

      console.log(order);

      // Get required params to execute trade order
      getContractParams(contract_address);

      // contract.tradeOrder();

      dispatch({ type: `${type}_FULFILLED`, payload: order });
    } else {
      dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
    }
  };
}
