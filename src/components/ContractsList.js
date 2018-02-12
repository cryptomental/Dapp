import React, { Component } from 'react';
import { Table, Input, Button, Icon, Row, Col } from 'antd';
import moment from 'moment';
import Loader from './Loader';

import './ContractsList.css';

// Example Contract
/* {
  "BASE_TOKEN": "0xa4392264a2d8c998901d10c154c91725b1bf0158",
  "CONTRACT_NAME": "ETHXBT",
  "ORACLE_QUERY": "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0",
  "PRICE_CAP": "60465",
  "PRICE_DECIMAL_PLACES": "2",
  "PRICE_FLOOR": "20155",
  "QTY_DECIMAL_PLACES": "10",
  "collateralPoolBalance": "0",
  "isSettled": true,
  "lastPrice": "105700"
} */

class ContractsList extends Component {
  state = {
    filters: null,
    sort: null,
    contracts: this.props.contracts,
  };

  componentWillMount() {
    if (!this.props.contracts) {
      this.props.onLoad();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contracts !== this.state.contracts) {
      this.setState({ contracts: nextProps.contracts });
    }
  }

  resetSearchFilter() {
    this.setState({
      contractFiltered: false,
      tokenFiltered: false,
      oracleFiltered: false
    });
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filters: filters,
      sort: sorter,
    });
  };

  onInputChange = (e, searchKey) => {
    this.setState({ [searchKey]: e.target.value });
  };

  onSearch = (dataKey, searchKey, searchVisibleKey, filteredKey) => {
    const searchText = this.state[searchKey];
    const reg = new RegExp(searchText, 'gi');
    this.resetSearchFilter();
    this.setState({
      [searchVisibleKey]: false,
      [filteredKey]: !!searchText,
      contracts: this.props.contracts.map((record) => {
        const match = record[dataKey].match(reg);
        if (!match) {
          return null;
        }
        return record;
      }).filter(record => !!record),
    });
  };

  render() {
    let { sort, filters } = this.state;
    sort = sort || {};
    filters = filters || {};

    const columns = [{
      title: 'Name',
      dataIndex: 'CONTRACT_NAME',
      width: 200,
      sorter: (a, b) => { return a.CONTRACT_NAME.localeCompare(b.CONTRACT_NAME); },
      sortOrder: sort.columnKey === 'CONTRACT_NAME' && sort.order,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.contractNameSearchInput = ele}
            placeholder="Search Contract Name"
            value={this.state['CONTRACT_NAME_SEARCH_TEXT']}
            onChange={(e) => this.onInputChange(e, 'CONTRACT_NAME_SEARCH_TEXT')}
            onPressEnter={() => this.onSearch('CONTRACT_NAME', 'CONTRACT_NAME_SEARCH_TEXT', 'contractSearchVisible', 'contractFiltered')}
          />
          <Button type="primary" onClick={() => this.onSearch('CONTRACT_NAME', 'CONTRACT_NAME_SEARCH_TEXT', 'contractSearchVisible', 'contractFiltered')}>
            Search
          </Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.contractFiltered ? '#108ee9' : '#aaa' }} />,
      contractSearchVisible: this.state.contractSearchVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          contractSearchVisible: visible,
        }, () => this.contractNameSearchInput && this.contractNameSearchInput.focus());
      },
    }, {
      title: 'Base Token',
      dataIndex: 'BASE_TOKEN',
      width: 300,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.baseTokenSearchInput = ele}
            placeholder="Search Base Token"
            value={this.state['BASE_TOKEN_SEARCH_TEXT']}
            onChange={(e) => this.onInputChange(e, 'BASE_TOKEN_SEARCH_TEXT')}
            onPressEnter={() => this.onSearch('BASE_TOKEN', 'BASE_TOKEN_SEARCH_TEXT', 'tokenSearchVisible', 'tokenFiltered')}
          />
          <Button type="primary" onClick={() => this.onSearch('BASE_TOKEN', 'BASE_TOKEN_SEARCH_TEXT', 'tokenSearchVisible', 'tokenFiltered')}>
            Search
          </Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.tokenFiltered ? '#108ee9' : '#aaa' }} />,
      tokenSearchVisible: this.state.tokenSearchVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          tokenSearchVisible: visible,
        }, () => this.baseTokenSearchInput && this.baseTokenSearchInput.focus());
      },
    }, {
      title: 'Oracle Query',
      dataIndex: 'ORACLE_QUERY',
      width: 300,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.oracleQuerySearchInput = ele}
            placeholder="Search Oracle Query"
            value={this.state['ORACLE_QUERY_SEARCH_TEXT']}
            onChange={(e) => this.onInputChange(e, 'ORACLE_QUERY_SEARCH_TEXT')}
            onPressEnter={() => this.onSearch('ORACLE_QUERY', 'ORACLE_QUERY_SEARCH_TEXT', 'oracleSearchVisible', 'tokenFiltered')}
          />
          <Button type="primary" onClick={() => this.onSearch('ORACLE_QUERY', 'ORACLE_QUERY_SEARCH_TEXT', 'oracleSearchVisible', 'oracleFiltered')}>Search</Button>
        </div>
      ),
      filterIcon: <Icon type="search" style={{ color: this.state.oracleFiltered ? '#108ee9' : '#aaa' }} />,
      oracleSearchVisible: this.state.oracleSearchVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          oracleSearchVisible: visible,
        }, () => this.oracleQuerySearchInput && this.oracleQuerySearchInput.focus());
      },
    }, {
      title: 'Settled',
      dataIndex: 'isSettled',
      width: 120,
      className: 'text-center',
      render: (text, row, index) => {
        return text ? <Icon type="check-circle" style={{ fontSize: 16, color: '#52c41a' }} /> : <Icon type="close-circle" style={{ fontSize: 16, color: '#f5222d' }} />;
      },
      filters: [
        { text: 'True', value: true },
        { text: 'False', value: false },
      ],
      filteredValue: filters.isSettled || null,
      onFilter: (value, record) => record.isSettled === (value === 'true'),
    }, {
      title: 'Balance',
      dataIndex: 'collateralPoolBalance',
      width: 120,
      className: 'text-center',
      sorter: (a, b) => a.collateralPoolBalance - b.collateralPoolBalance,
      sortOrder: sort.columnKey === 'collateralPoolBalance' && sort.order,
    }, {
      title: 'Expiration',
      dataIndex: 'EXPIRATION',
      width: 200,
      render: (text, row, index) => {
        return moment.unix(text).format("Do MMM YYYY, HH:MM:ss");
      },
      sorter: (a, b) => a.EXPIRATION - b.EXPIRATION,
      sortOrder: sort.columnKey === 'EXPIRATION' && sort.order,
    }];

    if (!this.state.contracts) {
      return (
        <div><Loader loading/></div>
      );
    }

    if (this.state.contracts.length === 0) {
      return (
        <div>No contracts found</div>
      );
    }

    return (
      <div>
        <Table columns={columns}
               dataSource={this.state.contracts}
               onChange={this.handleChange}
               pagination={{ pageSize: 25 }}
               scroll={{ y: '60vh' }}
               bordered
               title={() => 'Contracts'}
               expandedRowRender={record => {
                 return <Row>
                   <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                     <strong>Address :</strong> { record.key }
                   </Col>
                   <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                     <strong>Price Cap :</strong> { record.PRICE_CAP }
                   </Col>
                   <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                     <strong>Price Decimal Places :</strong> { record.PRICE_DECIMAL_PLACES }
                   </Col>
                   <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                     <strong>Price Floor :</strong> { record.PRICE_FLOOR }
                   </Col>
                   <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                     <strong>Qty Multiplier :</strong> { record.QTY_MULTIPLIER }
                   </Col>
                   <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                     <strong>Last Price :</strong> { record.lastPrice }
                   </Col>
                 </Row>;
               }}
        />
      </div>
    );
  }
}

export default ContractsList;
