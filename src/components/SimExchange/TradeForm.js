import React, { Component } from 'react';

import {
  Row,
  Col,
  Card,
  Modal,
  Table,
} from 'antd';

import columns from './columns';

import './TradeForm.css';

import OrderForm from './forms/orderForm.js';

class TradeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      trade: {},
      fields: {
        ask: {
          amount: {
            value: '',
          },
          price: {
            value: '',
          },
          total: {
            value: '',
          },
          market: {
            value: '',
          }
        },
        bid: {
          amount: {
            value: '',
          },
          price: {
            value: '',
          },
          total: {
            value: '',
          },
          market: {
            value: '',
          }
        }
      },
    };

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let fields = this.state.fields;

    if (this.props.trade.value !== nextProps.trade.amount) {
      fields[nextProps.trade.type] = {
        amount: { value: nextProps.trade.amount },
        price: { value: nextProps.trade.price },
        total: { value: nextProps.trade.total },
        market: { value: nextProps.trade.market },
      };
    }

    this.setState({ fields });
  }

  showModal() {
    this.setState({ modal: true });
  }

  handleCancel() {
    this.setState({ modal: false });
  }

  handleOk() {
    this.setState({ modal: false });
  }

  onSubmit(trade) {
    this.setState({ trade });
  }

  render() {
    const { fields, trade } = this.state;

    return (
       <Row type="flex" justify="space-around" gutter={24}>
        <Col span={12}>
          <Card title="Buy ETX">
            <OrderForm
              type="Buy"
              {...fields.ask}
              showModal={this.showModal} 
              onSubmit={this.onSubmit} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Sell ETX">
            <OrderForm
              type="Sell"
              {...fields.bid}
              showModal={this.showModal}
              onSubmit={this.onSubmit} />
          </Card>
        </Col>
        <Modal
          title="Confirmation required"
          visible={this.state.modal}
          onOk={this.handleOk} 
          onCancel={this.handleCancel}>
          <h3>Are you sure you want to buy {trade.amount} {trade.market} at {trade.price} ETX/ETH for a maximum of {trade.total} ETH?</h3>
          <Table
            pagination={false}
            size="small"
            columns={columns}
            dataSource={[trade]}>
          </Table>
        </Modal>
      </Row>
    );
  }
}

export default TradeForm;
  