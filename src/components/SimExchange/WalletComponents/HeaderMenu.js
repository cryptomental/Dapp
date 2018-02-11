import React, { Component } from 'react';

import { Tabs, Card, Row, Modal } from 'antd';

import SingleForm from './forms/single';
import DoubleForm from './forms/double';

import './header-menu.css';

const TabPane = Tabs.TabPane;

class HeaderMenu extends Component {
  constructor() {
    super();

    this.state = {
      amount: {},
      transaction: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  onSubmit(amount) {
    this.setState({ amount });
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


  render() {
    const { amount, transaction } = this.state;

    return (
      <Row gutter={24} className="header-menu">
        <Tabs tabPosition='left'>
          <TabPane tab="Deposit ETX" key="1">
            <Card title="Deposit ETX">
              <SingleForm
                onSubmit={this.onSubmit}
                showModal={this.showModal}
                type="deposit" 
                amount={amount} />
            </Card>
          </TabPane>
          <TabPane tab="Withdraw ETX" key="2">
            <Card title="Withdraw ETX">
              <SingleForm
                onSubmit={this.onSubmit}
                showModal={this.showModal}
                type="withdraw"
                amount={amount} />
            </Card>
          </TabPane>
          <TabPane tab="Send ETX" key="3">
            <Card title="Send ETX">
              <DoubleForm
                onSubmit={this.onSubmit}
                showModal={this.showModal}
                type="Send"
                transaction={transaction} />
            </Card>
          </TabPane>
          <TabPane tab="Send ETH" key="4">
            <Card title="Send ETH">
              <DoubleForm
                onSubmit={this.onSubmit}
                showModal={this.showModal}
                type="Send"
                transaction={transaction} />
            </Card>
          </TabPane>
        </Tabs>
        <Modal
          title="Confirmation required"
          visible={this.state.modal}
          onOk={this.handleOk} 
          onCancel={this.handleCancel}>
          <h3>Are you sure you want to {amount.type} {amount.number} ETX?</h3>
        </Modal>
      </Row>
    );
  }
};

export default HeaderMenu;
