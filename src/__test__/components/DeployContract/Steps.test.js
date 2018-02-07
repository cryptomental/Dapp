import React from 'react';
import ReactDOM from 'react-dom';
import { Input, InputNumber, Button } from 'antd';
import enzyme, { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import {
  NameContractStep,
  PricingStep,
  ExpirationStep,
  DataSourceStep,
  DeployStep
} from '../../../components/DeployContract/Steps';

enzyme.configure({ adapter: new Adapter() });

describe('NameContractStep', () => {
  let nameContractStep;
  beforeEach(() => {
    nameContractStep = mount(<NameContractStep />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NameContractStep />, div);
  });

  it('should display two input felds to accept name and base token address', () => {
    expect(nameContractStep.find(Input)).to.have.length(2);
  });

  it('should have a next button', () => {
    expect(nameContractStep.find(Button)).to.have.length(1);
  });
});

describe('PricingStep', () => {
  let pricingStep;
  beforeEach(() => {
    pricingStep = mount(<PricingStep />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PricingStep />, div);
  });

  it('should display two inputs felds to accept price cap and price floor address', () => {
    expect(pricingStep.find(InputNumber)).to.have.length(2);
  });

  it('should have two buttons to navigate back and forward', () => {
    expect(pricingStep.find(Button)).to.have.length(2);
  });
});

describe('ExpirationStep', () => {
  let expirationStep;
  beforeEach(() => {
    expirationStep = mount(<ExpirationStep />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExpirationStep />, div);
  });
});

describe('DataSourceStep', () => {
  let dataSourceStep;
  beforeEach(() => {
    dataSourceStep = mount(<DataSourceStep />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataSourceStep />, div);
  });
});

describe('DeplyStep', () => {
  let deployStep;
  beforeEach(() => {
    deployStep = mount(<DeployStep />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeployStep />, div);
  });
});
