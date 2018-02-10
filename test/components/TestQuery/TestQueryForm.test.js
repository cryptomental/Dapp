import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Steps } from 'antd';
import { expect } from 'chai';

import TestQueryForm from '../../../src/components/TestQuery/TestQueryForm';
import {
  AboutOraclesStep,
  QueryResultStep,
  SelectDataSourceStep,
  SetQueryStep
} from '../../../src/components/TestQuery/Steps';

describe('TestQueryForm', () => {
  let testQueryForm;

  beforeEach(() => {
    testQueryForm = shallow(<TestQueryForm />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestQueryForm />, div);
  });

  it('should render 4 steps', () => {
    expect(testQueryForm.find(Steps.Step)).to.have.length(4);
  });

  it('should render AboutOracleStep by default', () => {
    expect(testQueryForm.find(AboutOraclesStep)).to.have.length(1);
  });

  it('should render SelectDataSourceStep as second step', () => {
    testQueryForm.setState({ step: 1 });
    expect(testQueryForm.find(SelectDataSourceStep)).to.have.length(1);
  });

  it('should render SetQueryStep as third step', () => {
    testQueryForm.setState({ step: 2 });
    expect(testQueryForm.find(SetQueryStep)).to.have.length(1);
  });

  it('should render QueryResultStep as fourth step', () => {
    testQueryForm.setState({ step: 3 });
    expect(testQueryForm.find(QueryResultStep)).to.have.length(1);
  });
});
