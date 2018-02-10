import React, { Component } from 'react';
import { 
  Form,
  Input,
  Card,
  Button,
} from 'antd';

const FormItem = Form.Item;

const title = {
  ask: "Buy",
  bid: "Sell",
};

class BuyForm extends Component {
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
    const { market, form } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        this.props.showModal();
        this.props.onSubmit({...values, market, title: title[this.props.title] });
      }
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  render() {
    const { form } = this.props;
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched, 
      getFieldsError 
    } = form;

    const amountError = isFieldTouched('amount') && getFieldError('amount');
    const priceError = isFieldTouched('price') && getFieldError('price');
    const totalError = isFieldTouched('total') && getFieldError('total');

    return (
      <Card title={`${title[this.props.title]} ${this.props.market}`}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={amountError ? 'error' : ''}
            help={amountError || ''}>
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: 'Please enter an amount'}]
            })(<Input addonAfter="ETH" type="number" placeholder="Amount" />)}
          </FormItem>
          <FormItem
            validateStatus={priceError ? 'error' : ''}
            help={priceError  || ''}>
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Please enter a price'}]
            })(<Input addonAfter="ETX" type="number" placeholder="Price" />)}
          </FormItem>
          <FormItem
            validateStatus={totalError ? 'error' : ''}
            help={totalError  || ''}>
            {getFieldDecorator('total', {
              rules: [{ required: true, message: 'Please enter the total'}]
            })(<Input addonAfter="ETH" type="number" placeholder="Total" />)}
          </FormItem>
          <FormItem>
            <Button
              disabled={this.hasErrors(getFieldsError())}
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}>
              {title[this.props.title]}
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
};

const WrappedForm = Form.create({
  mapPropsToFields({ order }) {
    return {
      amount: Form.createFormField({
        value: order.amount, 
      }),
      price: Form.createFormField({
        value: order.price,
      }),
      total: Form.createFormField({
        value: order.total,
      }),
      market: Form.createFormField({
        value: order.market,
      }),
      type: Form.createFormField({
        value: order.type,
      }),
    };
  },
})(BuyForm);

export default WrappedForm;

