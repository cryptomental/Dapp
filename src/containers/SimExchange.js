import { connect } from "react-redux";

import SimExchangeComponent from "../components/SimExchange/SimExchange";
import { loadContracts } from "../actions/explorer";
import { selectContract, tradeOrder } from "../actions/simExchange";

const mapStateToProps = state => ({
  contracts: state.explorer.contracts,
  ...state.simExchange,
});

const mapDispatchToProps = dispatch => ({
  getContracts: () => dispatch(loadContracts()),
  selectContract: (addr) => dispatch(selectContract(addr)),
  tradeOrder: (order) => dispatch(tradeOrder(order))
});

const SimExchange = connect(mapStateToProps, mapDispatchToProps)(SimExchangeComponent);

export default SimExchange;
