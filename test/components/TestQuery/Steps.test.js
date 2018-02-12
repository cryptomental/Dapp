import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Select } from 'antd';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import DataSources from '../../../src/components/TestQuery/OracleDataSources';
import Loader from '../../../src/components/Loader';
import {
  AboutOraclesStep,
  QueryResultStep,
  SelectDataSourceStep,
  SetQueryStep
} from '../../../src/components/TestQuery/Steps';

const Option = Select.Option;

describe('AboutOraclesStep', () => {
  let aboutOracleStep;
  let onNextClickSpy;
  beforeEach(() => {
    onNextClickSpy = sinon.spy();
    aboutOracleStep = shallow(<AboutOraclesStep onNextClicked={onNextClickSpy}/>);

  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AboutOraclesStep />, div);
  });

  it('should display information about Oracles', () => {
    // humm...
  });

  it('sets correct onNextClicked property', () => {
    expect(aboutOracleStep.find(Button).props().onClick).to.equal(onNextClickSpy);
  });
});

describe('SelectDataSourceStep', () => {
  let selectDataSourceStep;
  let onNextClickSpy;
  let onPrevClickSpy;
  beforeEach(() => {
    onNextClickSpy = sinon.spy();
    onPrevClickSpy = sinon.spy();
    selectDataSourceStep = shallow(<SelectDataSourceStep 
      onNextClicked={onNextClickSpy}
      onPrevClicked={onPrevClickSpy} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SelectDataSourceStep />, div);
  });

  it('renders all data sources as Option', () => {
      const sourceOptions = DataSources.map(({ name }) => <Option key={name} value={name}>{name}</Option>);
      expect(selectDataSourceStep.containsAllMatchingElements(sourceOptions)).to.equal(true);
  });

  it('sets correct onNextClicked property', () => {
    const nextButton = selectDataSourceStep.find(Button).last();
    expect(nextButton.props().onClick).to.equal(onNextClickSpy);
  });

  it('sets correct onPrevClicked property', () => {
    const nextButton = selectDataSourceStep.find(Button).first();
    expect(nextButton.props().onClick).to.equal(onPrevClickSpy);
  });
});

describe('SetQueryStep', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SetQueryStep dataSource={DataSources[0].name} />, div);
  });

  // TODO: Add test to ensure data sources a properly validated
});

describe('QueryResultStep', () => {
  let queryResultStep;

  beforeEach(() => {
    queryResultStep = shallow(<QueryResultStep />);
  });

  it('should show loading correctly', () => {
    queryResultStep.setProps({ loading: true });
    expect(queryResultStep.find(Loader).props().loading).to.equal(true);
  });

  it('should hide loading correctly', () => {
    queryResultStep.setProps({ loading: false });
    expect(queryResultStep.find(Loader).props().loading).to.equal(false);
  });

  it('should display results when not loading', () => {
    const expectedResult = 'something nice';
    queryResultStep.setProps({ loading: false, error: null, result: expectedResult });
    expect(queryResultStep.find('.result').text()).to.equal(expectedResult);
  });

  it('should not display results when loading', () => {
    const expectedResult = 'something nice';
    queryResultStep.setProps({ loading: true, result: expectedResult });
    expect(queryResultStep.find('.result')).to.have.length(0);
  });
});
