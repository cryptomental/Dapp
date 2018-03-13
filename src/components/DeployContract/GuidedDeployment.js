import { Col, Row, Steps } from 'antd';
import React, { Component } from 'react';

import StepAnimation from '../StepAnimation';
import showMessage from '../message';
import { DataSourceStep, DeployStep, ExpirationStep, NameContractStep, PricingStep } from './Steps';

const Step = Steps.Step;

const parentColLayout = {
  lg: {
    span: 16
  },
  sm: {
    span: 22
  },
  xs: {
    span: 24
  }
};

/**
 * Component for Guided Deployment of Contracts
 *
 */
class GuidedDeployment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      transitionDirection: 'next',
      contractName: '',
      baseTokenAddress: '',
      priceFloor: '',
      priceCap: '',
      priceDecimalPlaces: '',
      qtyMultiplier: '',
      expirationTimeStamp: '',
      oracleDataSource: '',
      oracleQuery: '',
      oracleQueryRepeatSeconds: 86400, //default to daily queries.
      preFunding: 0,
    };
  }

  toNextStep() {
    this.setState({
      step: this.state.step + 1,
      transitionDirection: 'next'
    });
  }

  toPrevStep() {
    this.setState({
      step: this.state.step - 1,
      transitionDirection: 'prev'
    });
  }

  render() {
    const currentStep = this.state.step;
    const initialValues = this.props.initialValues;
    const steps = [
      <NameContractStep
        key="0"
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state} />,

      <DataSourceStep
        key="3"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        initialValues={initialValues}
        {...this.state} />,

      <PricingStep
        key="1"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state} />,

      <ExpirationStep
        key="2"
        onPrevClicked={this.toPrevStep.bind(this)}
        onNextClicked={this.toNextStep.bind(this)}
        updateDeploymentState={this.setState.bind(this)}
        {...this.state} />,

      <DeployStep
        key="4"
        deployContract={() => {
          this.props.onDeployContract(this.state);
        }}
        showErrorMessage={showMessage.bind(showMessage, 'error')}
        showSuccessMessage={showMessage.bind(showMessage, 'success')}
        loading={this.props.loading}
        contract={this.props.contract}
        error={this.props.error}/>
    ];

    return (
      <div className="page">
        <Row type="flex" justify="center">
          <Col {...parentColLayout}>
            <Steps current={currentStep} style={{marginBottom: '40px'}}>
              <Step title="Name"/>
              <Step title="Data Source"/>
              <Step title="Pricing"/>
              <Step title="Expiration"/>
              <Step title="Deploy"/>
            </Steps>
            <StepAnimation
              direction={this.state.transitionDirection}>
              {steps.filter((step, index) => currentStep === index)}
            </StepAnimation>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GuidedDeployment;
