import React, { Component } from 'react';
import _ from 'lodash';
import { 
  Form as AntForm,
  Input,
  Button,
} from 'antd';

const FormItem = AntForm.Item;

class Form extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.form.validateFields();
    });
  }

  handleSubmit(e) {
    const { form } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        this.props.showModal();
        this.props.onSubmit({...values, type: this.props.type });
      }
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  render() {
    const { form } = this.props;
    let { type } = this.props;

    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched, 
      getFieldsError 
    } = form;

    const addressError = isFieldTouched('address') && getFieldError('address');
    const numberError = isFieldTouched('number') && getFieldError('number');
    type = _.capitalize(type);

    return (
      <AntForm onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={addressError ? 'error' : ''}
          help={addressError || ''}>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter an address'}]
          })(<Input addonAfter="ETH" type="text" placeholder="0x" size="large" />)}
        </FormItem>
        <FormItem
          validateStatus={numberError ? 'error' : ''}
          help={numberError || ''}>
          {getFieldDecorator('number', {
            rules: [{ required: true, message: 'Please enter a number'}]
          })(<Input addonAfter="ETH" type="number" placeholder="10.000" size="large" />)}
        </FormItem>
        <FormItem>
          <Button
            disabled={this.hasErrors(getFieldsError())}
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}>{ type }</Button>
        </FormItem>
      </AntForm>
    );
  }
};

const WrappedForm = AntForm.create({
  mapPropsToFields({ transaction }) {
    return {
      address: AntForm.createFormField({
        value: transaction.address, 
      }),
      amount: AntForm.createFormField({
        value: transaction.amount, 
      }),
    };
  },
})(Form);

export default WrappedForm;

