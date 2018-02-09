import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import columns from './columns';

import asks from './data/asks';
import bids from './data/bids';

import '../TradeList.css';

class TradeList extends Component {
  constructor() {
    super();

    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(record) {
    this.props.onTradeSelect(record);
  }

  render() {
    return (
      <Row type="flex" justify="center" gutter={24}>
        <Col span={12}>
          <Table
            onRow={(record) => ({
              onClick: () => this.onRowClick(record)
            })}
            pagination={false}
            title={() => 'Asks'}
            size="small"
            dataSource={asks} 
            columns={columns} />
        </Col>
        <Col span={12}>
          <Table
            onRow={(record) => ({
              onClick: () => this.onRowClick(record)
            })}
            pagination={false}
            title={() => 'Bids'}
            size="small"
            dataSource={bids}
            columns={columns} />
        </Col>
      </Row>
    );
  }
}

export default TradeList;
