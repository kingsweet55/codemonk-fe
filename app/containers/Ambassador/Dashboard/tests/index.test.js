import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { Dashboard as MainForm } from '../index';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = { history: { replace: jest.fn() }, location: { redirection: false } };
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Dashboard Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});
