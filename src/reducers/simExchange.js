export default function reducer(
  state = {
    error: null,
    loading: false,
    contract: null,
    trades: null,
  },
  action,
) {
  const tradeOrderAction = 'TRADE_ORDER';

  switch (action.type) {
    case `${tradeOrderAction}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `${tradeOrderAction}_FULFILLED`:
      return {
        ...state,
        loading: false,
        trades: action.payload,
        error: null,
      };

    case `${tradeOrderAction}_REJECTED`:
      return {
        ...state,
        loading: false,
        trades: null,
        error: action.payload,
      };

    case 'SELECTED_CONTRACT':
      return {
        ...state,
        contract: action.payload
      };

    default:
      return state;
  }
}
