import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

class Wallet extends Component {
  render() {
    return (
      <Layout style={{ background: '#FFF' }}>
        <Content style={{ background: '#FFF' }}>
          Wallet
        </Content>
      </Layout>
    );
  }
}

export default Wallet;
