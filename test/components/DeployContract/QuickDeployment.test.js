import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Form } from 'antd';
import moment from 'moment';

import QuickDeployment from '../../../src/components/DeployContract/QuickDeployment';

function validContractFields() {
  return {
    contractName: { value: 'ABA' },
    baseTokenAddress: { value: '0x33333' },
    priceFloor: { value: 0 },
    priceCap: { value: 50 },
    priceDecimalPlaces: { value: 2 },
    qtyMultiplier: { value: 2 },
    expirationTimeStamp: { value: moment().add(1, 'days') }, // always in the future
    oracleDataSource: { value: 'URL' },
    oracleQuery: { value: 'json(https://api.gdax.com/products/BTC-USD/ticker).price' },
    oracleQueryRepeatSeconds: { value: 86400 },
    preFunding: { value: 18831000000900000 }
  };
}

describe('QuickDeployment', () => {
  let quickDeployment;
  let wrappedFormRef;
  let switchModeSpy;
  let onDeploySpy;
  let successMessageSpy;
  let errorMessageSpy;

  beforeEach(() => {
    switchModeSpy = sinon.spy();
    onDeploySpy = sinon.spy();
    successMessageSpy = sinon.spy();
    errorMessageSpy = sinon.spy();
    quickDeployment = mount(<QuickDeployment
      initialValues={{}}
      switchMode={switchModeSpy}
      showErrorMessage={errorMessageSpy}
      showSuccessMessage={successMessageSpy}
      onDeployContract={onDeploySpy}
      wrappedComponentRef={(inst) => wrappedFormRef = inst} />);
  });

  it('should render', () => {
    mount(<QuickDeployment initialValues={{}}/>);
  });

  it('should switch mode to guided when switch-mode-link is clicked', () => {
    quickDeployment.find('.switch-mode-link').simulate('click');
    expect(switchModeSpy.calledWith('guided')).to.equal(true);
  });

  it('should showSuccessMessage when contract is created', () => {
    quickDeployment.setProps({ error: null, loading: true, contract: null });
    expect(successMessageSpy).to.have.property('callCount', 0);
    quickDeployment.setProps({ error: null, loading: false, contract: {
      address: '0x00000'
    } });
    expect(successMessageSpy).to.have.property('callCount', 1);
  });

  it('should showErrorMessage when error occurs', () => {
    quickDeployment.setProps({ error: null, loading: true});
    expect(errorMessageSpy).to.have.property('callCount', 0);
    quickDeployment.setProps({ error: 'Error occured', loading: false });
    expect(errorMessageSpy).to.have.property('callCount', 1);
  });

  it('should disable submit if component is loading', () => {
    quickDeployment.setProps({
      loading: true
    });
    const submitButton = quickDeployment.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(true);
  });

  it('should disable submit if fields have errors', () => {
    wrappedFormRef.props.form.setFields({ contractName: {
      value: '',
      errors: [ new Error('No name') ]
    } });
    quickDeployment.setProps({
      loading: false
    });
    const submitButton = quickDeployment.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(true);
  });

  it('should enable submit button if component is not loading and no errors', () => {
    // no errors are set by default on the form
    quickDeployment.setProps({
      loading: false
    });

    const submitButton = quickDeployment.find('.submit-button').first();
    expect(submitButton.prop('disabled')).to.equal(false);
  });

  it('should disable reset button when loading', () => {
    quickDeployment.setProps({
      loading: true
    });

    const resetButton = quickDeployment.find('.reset-button').first();
    expect(resetButton.prop('disabled')).to.equal(true);
  });

  it('should reset form when .reset-button is clicked', () => {
    const defaultFieldValues = wrappedFormRef.props.form.getFieldsValue();
    wrappedFormRef.props.form.setFields(validContractFields());
    quickDeployment.setProps({
      loading: false
    });

    const resetButton = quickDeployment.find('.reset-button').first();
    resetButton.simulate('click', { preventDefault() {} });

    const valuesAfterReset = wrappedFormRef.props.form.getFieldsValue();
    expect(valuesAfterReset).to.deep.equals(defaultFieldValues);
  });

  it('should call onDeployContract with form values when submitted', () => {
    wrappedFormRef.props.form.setFields(validContractFields());

    quickDeployment.find(Form).first().simulate('submit', { preventDefault() {} });
    expect(onDeploySpy).to.have.property('callCount', 1);
    // TODO: Test the values passed to onDeployContract
  });

  it('should not call onDeployContract when form is invalid.', () => {
    wrappedFormRef.props.form.setFields({ contractName: {
      value: '',
      errors: [ new Error('No name set') ]
    } });

    quickDeployment.find(Form).first().simulate('submit', { preventDefault() {} });
    expect(onDeploySpy).to.have.property('callCount', 0);
  });
});
