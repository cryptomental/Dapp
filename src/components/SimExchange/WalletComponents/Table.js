import React, { Component, Fragment } from 'react';

import {
  Table, 
  Row,
  Col,
  Slider,
  Radio,
} from 'antd';

import columns from './columns';
import wallet from '../data/wallet';

import './table.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class BuyTable extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: 1,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      inputValue: value,
    });
  }

  render() {
    return (
      <Fragment>
        <Row gutter={24} className="table-header" align="middle" type="flex">
          <Col span={4}>
            <h1 className="table-header-title">Transfer</h1>
          </Col>
          <Col span={14}>
            <div className="slider-wrapper">
              <span>{this.state.inputValue}</span>
              <Slider 
                min={1}
                max={20}
                value={this.state.inputValue} 
                onChange={this.onChange} />
              <span>live</span>
            </div>
          </Col>
          <Col span={6} className="time-group">
            <RadioGroup defaultValue="0.15">
              <RadioButton value="0.15">15m</RadioButton>
              <RadioButton value="0.30">30m</RadioButton>
              <RadioButton value="1">1h</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row gutter={24}>
          <Table dataSource={wallet} columns={columns} />
        </Row>
      </Fragment>
    );
  }
};

export default BuyTable;
