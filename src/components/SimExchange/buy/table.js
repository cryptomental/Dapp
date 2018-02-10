import React, { Component } from 'react';

import { Table } from 'antd';

import columns from '../columns';
import asks from '../data/asks';

import './table.css';

class BuyTable extends Component {
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
        dataSource={asks} 
        columns={columns} />
    );
  }
};

export default BuyTable;
