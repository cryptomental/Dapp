export default function reducer(
  state = {
    prefunding: null,
    prefunding_loading: false,
    error: null,
  },
  action,
) {
  const actionType = 'CALCULATE_PREFUNDING';
  switch (action.type) {
    case `${actionType}_PENDING`:
      return {
        ...state,
        prefunding_loading: true,
        prefunding: null,
        error: null,
      };

    case `${actionType}_FULFILLED`:
      return {
        ...state,
        prefunding_loading: false,
        prefunding: action.payload,
        error: null,
      };

    case `${actionType}_REJECTED`:
      return {
        ...state,
        prefunding_loading: false,
        prefunding: null,
        error: action.payload,
      };

    default:
      return state;
  }
}
