import { connect } from 'react-redux';

import Contracts from '../Contracts.js';
import { deployContract, handlePreFunding } from '../actions/deploy';
import DeployContractForm from '../components/DeployContract/DeployContractForm';
import store from '../store';

const mapStateToProps = state => {
  const { loading, error, contract } = state.deploy;
  const { prefunding, prefunding_loading } = state.prefunding;

  return {
    loading,
    error,
    contract,
    prefunding,
    prefunding_loading,
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
    onHandlePreFunding: (changedValues, contractData) => {
      dispatch(handlePreFunding({
        web3: store.getState().web3.web3Instance,
        changedValues,
        contractData,
      }, Contracts));
    },
  };
};

const Deploy = connect(mapStateToProps, mapDispatchToProps)(DeployContractForm);

export default Deploy;
