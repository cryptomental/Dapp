import React, { Component } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

class Trades extends Component {
  render() {
    return (
      <Layout style={{ background: '#FFF' }}>
        <Content style={{ background: '#FFF' }}>
          Trades
        </Content>
      </Layout>
    );
  }
}

export default Trades;
