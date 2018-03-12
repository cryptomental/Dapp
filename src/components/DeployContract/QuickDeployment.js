import { Alert, Button, Col, Form, Row } from 'antd';
import React, { Component } from 'react';

import Loader from '../Loader';
import Field from './DeployContractField';
import DeployContractSuccess from './DeployContractSuccess';

const formButtonLayout = {
  xs: {
    span: 24,
  },
  sm: {
    span: 8
  },
};

const formItemColLayout = {
  lg: {
    span: 8
  },
  sm: {
    span: 11
  },
  xs: {
    span: 24
  }
};

function ContractFormRow(props) {
  return (
    <Row type="flex" justify="center" gutter={16} {...props}>
      {props.children}
    </Row>
  );
}

function ContractFormCol(props) {
  return (
    <Col {...formItemColLayout} {...props}>
      {props.children}
    </Col>
  );
}

/**
 * Component for deploying Contracts Quickly.
 *
 */
class QuickDeployment extends Component {
  componentWillReceiveProps(nextProps) {
    if(this.props.loading && !nextProps.loading) {
      if(nextProps.error) {
        // We had an error
        this.props.showErrorMessage(`There was an error deploying the contract: ${nextProps.error}`, 8);
      } else if (nextProps.contract) {
        // Contract was deployed
        this.props.showSuccessMessage(DeployContractSuccess({ contract: nextProps.contract }), 5);
      }
    }
  }

  handleReset(event) {
    event.preventDefault();
    this.props.form.resetFields();
  }

  handleDeploy(event) {
    event.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const values = {
        ...fieldsValue,
        expirationTimeStamp: Math.floor(fieldsValue['expirationTimeStamp'].valueOf() / 1000)
      };

      this.props.onDeployContract(values);
    });
  }

  isSubmitDisabled() {
    if(this.props.loading) return true;

    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some(field => errors[field]);
  }

  handleModeSwitching(e) {
    e.preventDefault();
    this.props.switchMode('guided');
  }

  render() {
    const { initialValues } = this.props;
    return (
      <div>
        <Alert
          style={{textAlign: 'center'}}
          banner
          type="info"
          showIcon={false}
          message={
            <span>
              First time deploying a Contract? Try the <a className="switch-mode-link" href={this.props.guidedModeUrl} onClick={this.handleModeSwitching.bind(this)}>guided mode</a>.
            </span>
          }
        />
        <div className="page">
          <Form onSubmit={this.handleDeploy.bind(this)} layout="vertical">
            <ContractFormRow>
              <ContractFormCol>
                <Field name='contractName' initialValue={initialValues.contractName} form={this.props.form} showHint/>
              </ContractFormCol>

              <ContractFormCol>
                <Field name='baseTokenAddress' initialValue={initialValues.baseTokenAddress} form={this.props.form} showHint/>
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field name='priceFloor' initialValue={parseInt(initialValues.priceFloor, 10)} form={this.props.form} showHint/>
              </ContractFormCol>

              <ContractFormCol>
                <Field name='priceCap' initialValue={parseInt(initialValues.priceCap, 10)} form={this.props.form} showHint/>
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field name='priceDecimalPlaces' initialValue={parseInt(initialValues.priceDecimalPlaces, 10)} form={this.props.form} showHint/>
              </ContractFormCol>

              <ContractFormCol>
                <Field name="qtyMultiplier" initialValue={parseInt(initialValues.qtyMultiplier, 10)} form={this.props.form} showHint/>
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field name='expirationTimeStamp' initialValue={initialValues.expirationTimeStamp} form={this.props.form} showHint/>
              </ContractFormCol>

              <ContractFormCol>
                <Field name='oracleDataSource' initialValue={initialValues.oracleDataSource} form={this.props.form} showHint/>
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field name='oracleQuery' initialValue={initialValues.oracleQuery} form={this.props.form} showHint/>
              </ContractFormCol>

              <ContractFormCol>
                <Field name='oracleQueryRepeatSeconds' initialValue={parseInt(initialValues.oracleQueryRepeatSeconds, 10)} form={this.props.form} showHint/>
              </ContractFormCol>
            </ContractFormRow>

            <ContractFormRow>
              <ContractFormCol>
                <Field name='preFunding' initialValue={parseInt(initialValues.preFunding, 10)} form={this.props.form} showHint/>
              </ContractFormCol>
            </ContractFormRow>

            <Row type="flex" justify="center">
              <Col {...formButtonLayout}>
                <Button className="submit-button" type="primary" htmlType="submit" loading={this.props.loading} disabled={this.isSubmitDisabled()} style={{width: '100%'}}>
                  Deploy Contract
                </Button>
              </Col>
            </Row>

            <Row type="flex" justify="center" style={{ marginTop: '16px' }}>
              <Col {...formButtonLayout}>
                <Button className="reset-button" type="secondary" style={{width: '100%'}} disabled={this.props.loading} onClick={this.handleReset.bind(this)}>
                  Reset Form
                </Button>
              </Col>
            </Row>

            <Loader loading={this.props.loading} />
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(QuickDeployment);
