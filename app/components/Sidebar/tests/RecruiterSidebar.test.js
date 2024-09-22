import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import StorageService from 'utils/StorageService';
import { RecruiterSidebar as MainForm } from '../RecruiterSidebar';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
};

const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('InterviewDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('Test emitter functions', () => {
  test('Testing if toggle with proxyLoginRecruiter = true', () => {
    const component = shallow(<MainForm />);
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('userType', '5');
    Emitter.emit(Emitter.EVENTS.Proxy_Login_Recruiter, true);
    expect(component.state().roleType).toEqual('talent-partner');
  });

  test('Testing if toggle with proxyLoginRecruiter = false', () => {
    const component = shallow(<MainForm />);
    const token = 'token';
    StorageService.set('jwtToken', token);
    Emitter.emit(Emitter.EVENTS.Proxy_Login_Recruiter, false);
    expect(component.state().isSignIn).toEqual(true);
  });

  test('Testing if toggle with proxyBackToAdmin = true', () => {
    const component = shallow(<MainForm />);
    StorageService.set('userType', '4');
    Emitter.emit('proxyBackToAdmin', true);
    expect(component.state().roleType).toEqual('admin');
  });

  test('Testing if toggle with proxyBackToAdmin = false', () => {
    const component = shallow(<MainForm />);
    StorageService.set('userType', '5');
    Emitter.emit('proxyBackToAdmin', false);
    expect(component.state().roleType).toEqual('admin');
  });

  // componentWillUnmount
  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });
});
