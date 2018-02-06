import React, { Component } from 'react';
import { Button, Col, Dropdown, Icon, Menu, Row } from 'antd';

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">0x1</Menu.Item>
    <Menu.Item key="2">0x2</Menu.Item>
    <Menu.Item key="3">0x3</Menu.Item>
  </Menu>
);


class TopBar extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8}>Last Price: 0.00453143 ETH</Col>
          <Col span={8} offset={8}>
            <Dropdown overlay={menu}>
              <Button style={{ marginLeft: 8 }}>
                Account <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TopBar;
