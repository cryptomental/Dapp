export default function reducer(
  state = {
    trades: null,
    loading: false,
    error: null,
  },
  action,
) {
  const actionType = 'GET_TRADES';
  switch (action.type) {
    case `${actionType}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `${actionType}_FULFILLED`:
      return {
        ...state,
        loading: false,
        trades: action.payload,
        error: null,
      };

    case `${actionType}_REJECTED`:
      return {
        ...state,
        loading: false,
        trades: null,
        error: action.payload,
      };

    default:
      return state;
  }
}
