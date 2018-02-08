import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import columns from './columns';

import asks from './data/asks';
import bids from './data/bids';

import '../TradeList.css';

class TradeList extends Component {
  render() {
    const rowSelection = {
      type: 'radio',
      onSelect: (selectedRowKeys) => {
        this.props.onTradeSelect(selectedRowKeys);
      },
    };

    return (
      <Row type="flex" justify="center" gutter={24}>
        <Col span={12}>
          <Table
            rowSelection={rowSelection}
            pagination={false}
            title={() => 'Asks'}
            size="small"
            dataSource={asks} 
            columns={columns} />
        </Col>
        <Col span={12}>
          <Table
            rowSelection={rowSelection}
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
