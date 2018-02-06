import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavItem extends Component {
  render () {
    const { location, to, children } = this.props;

    // Sim Exchange wouldn't be `active` in case of it's sub-routes as it'll fail the equality check
    // of the `location.pathname` and `to`
    let isActive  = location.pathname.indexOf(to) === 0;

    return (
      <li className={isActive ? 'ant-menu-item ant-menu-item-selected' : 'ant-menu-item'}>
        <Link to={to}>{children}</Link>
      </li>
    );
  }
}

NavItem = withRouter(NavItem);

export default NavItem;
