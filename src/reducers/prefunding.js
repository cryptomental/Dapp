export default function reducer(
  state = {
    prefunding: null,
    loading: false,
    error: null,
  },
  action,
) {
  const actionType = 'CALCULATE_PREFUNDING';
  switch (action.type) {
    case `${actionType}_PENDING`:
      return {
        ...state,
        loading: true,
        prefunding: null,
        error: null,
      };

    case `${actionType}_FULFILLED`:
      return {
        ...state,
        loading: false,
        prefunding: action.payload,
        error: null,
      };

    case `${actionType}_REJECTED`:
      return {
        ...state,
        loading: false,
        prefunding: null,
        error: action.payload,
      };

    default:
      return state;
  }
}
