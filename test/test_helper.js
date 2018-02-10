import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import store from '../src/store';

/**
 * Helper to test components that need the redux provider
 * 
 * mount is used because it's necessary to render all tree
 * due to Provider wrapper and connect hoc.
 * 
 * @param {@reactElement} Component Component to be mounted
 * @param {object} state Current app state for tests
 * @param {objeact} props Current component's props
 * @returns {reactElement} The Component wrapped in a Provider container
 */
export const renderComponent = (Component, state = {}, props = {}) => {
  return mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
