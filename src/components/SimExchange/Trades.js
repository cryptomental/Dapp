import React, { Component } from 'react';
import { Layout } from 'antd';

import TradeList from './TradeList';
import TradeForm from './TradeForm';

import './Trades.css';

const { Content } = Layout;

class Trades extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trade: {},
      market: 'ETX'
    };

    this.tradeSelection = this.tradeSelection.bind(this);
  }

  tradeSelection(trade) {
    this.setState({ trade });
  }

  render() {
    const { trade } = this.state;

    return (
      <Layout style={{ background: '#FFF' }}>
        <Content style={{ background: '#FFF' }}>
          <div className="tradeForm-container">
            <TradeForm market={this.state.market} trade={trade} />
          </div>
          <TradeList onTradeSelect={this.tradeSelection} />
        </Content>
      </Layout>
    );
  }
}

export default Trades;
