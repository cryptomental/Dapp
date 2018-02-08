import React from 'react';
import { 
  Form,
  Input,
  Button,
} from 'antd';

const FormItem = Form.Item;

const OrderForm = Form.create({
  mapPropsToFields(props) {
    return {
      amount: Form.createFormField({
        value: props.amount.value,
      }),
      price: Form.createFormField({
        value: props.price.value,
      }),
      total: Form.createFormField({
        value: props.total.value,
      }),
      market: Form.createFormField({
        value: props.market.value,
      }),
    };
  },
})((props) => {
  const { form, type, showModal, onSubmit } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        showModal();
        onSubmit({...values, market: props.market.value});
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('amount', {
          rules: [{ required: true, message: 'Please enter an amount'}]
        })(<Input addonAfter="ETH" type="number" placeholder="Amount" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('price', {
          rules: [{ required: true, message: 'Please enter a price'}]
        })(<Input addonAfter="ETX" type="number" placeholder="Price" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('total', {
          rules: [{ required: true, message: 'Please enter the total'}]
        })(<Input addonAfter="ETH" type="number" placeholder="Total" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          { type }
        </Button>
      </FormItem>
    </Form>
  );
});

export default OrderForm;
