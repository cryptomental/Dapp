import { connect } from "react-redux";

import SimExchangeComponent from "../components/SimExchange/SimExchange";

const mapStateToProps = state => ({
  ...state.simExchange,
});

const SimExchange = connect(mapStateToProps)(SimExchangeComponent);

export default SimExchange;
