import React, { Component } from 'react';
import _ from 'lodash';

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
      selectedTrade: {},
      trade: {
        ask: {},
        bid: {}
      },
    };

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let trade = this.state.trade;
    
    if (this.props.trade.amount !== nextProps.trade.amount) {
      trade[nextProps.trade.type] = nextProps.trade;
    }

    this.setState({ trade });
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

  onSubmit(record) {
    let trade = this.state.trade;
    trade[record.type] = record;

    this.setState({ 
      selectedTrade: record,
      trade,
    });
  }

  render() {
    const { market } = this.props;
    const { trade, selectedTrade } = this.state;

    return (
       <Row type="flex" justify="space-around" gutter={24}>
        <Col span={12}>
          <Card title="Buy ETX">
            <OrderForm
              label="Buy"
              type="ask"
              trade={trade.ask}
              market={market}
              showModal={this.showModal} 
              onSubmit={this.onSubmit} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Sell ETX">
            <OrderForm
              label="Sell"
              trade={trade.bid}
              type="bid"
              market={market}
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
            rowKey={() => _.uniqueId('row')}
            pagination={false}
            size="small"
            columns={columns}
            dataSource={[selectedTrade]}>
          </Table>
        </Modal>
      </Row>
    );
  }
}

export default TradeForm;
  