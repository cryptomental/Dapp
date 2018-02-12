import React, { Component } from 'react';

import { Table } from 'antd';

import columns from '../columns';
import asks from '../data/asks';
import bids from '../data/bids';

import './table.css';

class OrdersTable extends Component {
  constructor() {
    super();

    this.onRowSelect = this.onRowSelect.bind(this);
  }

  onRowSelect(record) {
    this.props.onRowSelect(record);
  }

  render() {
    return (
      <Table
        onRow={(order) => ({
          onClick: () => this.onRowSelect(order)
        })}
        pagination={false}
        title={() => this.props.title}
        size="small"
        dataSource={this.props.title === 'asks' ? asks : bids}
        columns={columns} />
    );
  }
}

export default OrdersTable;
