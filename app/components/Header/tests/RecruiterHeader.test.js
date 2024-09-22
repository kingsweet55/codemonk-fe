import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';

import RecruiterHeader from '../RecruiterHeader';
import configureStore from '../../../configureStore';

describe('<RecruiterHeader />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <RecruiterHeader />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Test emitter functions', () => {
  test('Testing if toggle with proxyLoginRecruiter = true', () => {
    const component = shallow(<RecruiterHeader />);
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('signupStep', 3);
    StorageService.set('proxyType', 'talent-partner');
    StorageService.set('userType', 5);
    Emitter.emit(Emitter.EVENTS.Proxy_Login_Recruiter, true);
    expect(component.state().proxyType).toEqual('talent-partner');
  });

  test('Testing if toggle with proxyLoginRecruiter = false', () => {
    const component = shallow(<RecruiterHeader />);
    StorageService.set('proxyType', 'talent-partner');
    Emitter.emit(Emitter.EVENTS.Proxy_Login_Recruiter, false);
    expect(component.state().proxyType).toEqual('talent-partner');
  });
});

describe('Test functions', () => {
  const getWrapper = () => shallow(<RecruiterHeader />);
  const getInstance = () => getWrapper().instance();

  test('Testing if dropdownToggle', () => {
    const dropdownToggle = jest.spyOn(getInstance(), 'dropdownToggle');
    dropdownToggle();
    expect(dropdownToggle).toHaveBeenCalledTimes(1);
  });
});
