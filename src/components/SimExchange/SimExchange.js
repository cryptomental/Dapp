import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {Route, Redirect, Switch, withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import TopBar from "./TopBar";
import Trades from "./Trades";
import Wallet from "./Wallet";

const { Content, Header, Sider } = Layout;

class SimExchange extends Component {
  render() {
    const { location } = this.props;

    return (
      <Layout>
        <Header style={{ paddingLeft: '224px', background: '#fff'}}>
          <TopBar/>
        </Header>
        <Layout style={{ background: '#fff' }}>
          <Sider style={{ background: '#fff' }} width={200}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{ height: '95px' }}
            >
              <Menu.Item key="/exchange/trades/">
                <Link to="/exchange/trades/">Trades</Link>
              </Menu.Item>
              <Menu.Item key="/exchange/wallet/">
                <Link to="/exchange/wallet/">Wallet</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 250 }}>
            <Switch>
              <Route path="/:url*" exact strict render={props => <Redirect to={`${props.location.pathname}/`}/>}/>
              <Route path="/exchange/trades/" exact component={Trades} />
              <Route path="/exchange/wallet/" exact component={Wallet} />
              <Redirect to="/exchange/trades/" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

SimExchange = withRouter(SimExchange);

export default SimExchange;
