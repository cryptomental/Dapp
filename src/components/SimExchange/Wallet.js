import React, { Component } from 'react';
import {
  Layout,
  Row,
  Tabs,
  Table,
  Popover,
  Button,
  Input,
  Card,
} from 'antd';

import wallet from './data/wallet';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

const columns = [
  {
    title: 'Block #',
    dataIndex: 'block',
    key: 'block',
  }, 
  {
    title: 'In / Out',
    dataIndex: 'inout',
    key: 'inout',
  }, 
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  }, 
  {
    title: 'From / To',
    key: 'addresses',
    render: (text, record) => (
      <div>
        <div>{text.addresses.from}</div>
        <div>{text.addresses.to}</div>
      </div>
    )
  }, 
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: '',
    key: 'details',
    render: (text, record) => (
      <Popover 
        placement="left" 
        trigger="click"
        content={(
          <div className="popover-content">
            <div>
              <div>Hash:</div>
              <div>{text.details.hash}</div>
            </div>
            <div>
              <div>Trade id:</div>
              <div>{text.details.id}</div>
            </div>
          </div>
        )}>
        <Button>Details</Button>
      </Popover>
    )
  },
];

class Wallet extends Component {
  render() {
    return (
      <Layout style={{ background: '#FFF' }}>
        <Content style={{ background: '#FFF' }}>
          <Row>
            <Tabs tabPosition='left'>
              <TabPane tab="Deposit ETX" key="1">
                <Card title="Deposit ETX">
                  <Input
                    type="number"
                    addonAfter="ETX"
                    size="large"
                    placeholder="10.000" />
                  <Button type="primary">Deposit</Button>
                </Card>
              </TabPane>
              <TabPane tab="Withdraw ETX" key="2">
                <Card title="Withdraw ETX">
                  <Input
                    type="number"
                    addonAfter="ETX"
                    size="large"
                    placeholder="10.000" />
                  <Button type="primary">Withdraw</Button>
                </Card>
              </TabPane>
              <TabPane tab="Send ETX" key="3">
                <Card title="Send ETX">
                  <Input
                    type="number"
                    addonAfter="ETX"
                    size="large"
                    placeholder="0x" />
                  <Input
                    type="number"
                    addonAfter="ETX"
                    size="large"
                    placeholder="10.00000" />
                </Card>
              </TabPane>
              <TabPane tab="Send ETH" key="4">
                <Card title="Send ETH">
                  <Input
                    type="number"
                    addonAfter="ETX"
                    size="large"
                    placeholder="0x" />
                  <Input
                    type="number"
                    addonAfter="ETX"
                    size="large"
                    placeholder="10.00000" />
                </Card>
              </TabPane>
            </Tabs>
          </Row>
          <Table dataSource={wallet} columns={columns} />
        </Content>
      </Layout>
    );
  }
}

export default Wallet;
