export function simExchange() {
  const type = 'SIM_EXCHANGE';

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
  };
}
