import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { deployContract } from '../actions/deploy';
import DeployContractForm from '../components/DeployContract/DeployContractForm';
import store from '../store';

const mapStateToProps = state => {
  const { loading, error, contract } = state.deploy;

  return {
    loading,
    error,
    contract
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeployContract: contractSpecs => {
      dispatch(deployContract({
        web3: store.getState().web3.web3Instance,
        contractSpecs
      }, Contracts));
    },

  };
};

const Deploy = connect(mapStateToProps, mapDispatchToProps)(DeployContractForm);

export default Deploy;
