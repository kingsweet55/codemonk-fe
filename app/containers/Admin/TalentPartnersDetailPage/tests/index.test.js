import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { TalentPartnersDetailPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  onChangeResult: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('TalentPartnersDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadAdminRecruiterDetails', () => {
    const loadAdminRecruiterDetails = jest.spyOn(getInstance(), 'loadAdminRecruiterDetails');
    loadAdminRecruiterDetails();
    expect(loadAdminRecruiterDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminRecruiterDetails with status 0', () => {
    const setAdminRecruiterDetails = jest.spyOn(getInstance(), 'setAdminRecruiterDetails');
    const response = { status: 0, message: 'some error' };
    setAdminRecruiterDetails(response);
    expect(setAdminRecruiterDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAdminRecruiterDetails with status 1', () => {
    const setAdminRecruiterDetails = jest.spyOn(getInstance(), 'setAdminRecruiterDetails');
    const response = { status: 1, data: {} };
    setAdminRecruiterDetails(response);
    expect(setAdminRecruiterDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderCompanyDetails', () => {
    const renderCompanyDetails = jest.spyOn(getInstance(), 'renderCompanyDetails');
    renderCompanyDetails();
    expect(renderCompanyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderCompanyLogo', () => {
    const renderCompanyLogo = jest.spyOn(getInstance(), 'renderCompanyLogo');
    renderCompanyLogo();
    expect(renderCompanyLogo).toHaveBeenCalledTimes(1);
  });

  test('Testing if showProxyLoginCTA', () => {
    const recruiterData = {
      status: 1,
      data: {
        _id: '07f2d0b238',
        firstName: 'Client Unregistered',
        lastName: 'Last Name',
        billing: {
          type: 'individual',
        },
        jobTitle: 'CTO',
        addressLineOne: '200 Avenida Miguel Alemán',
        city: 'San Nicolás de los Garza',
        country: 'Mexico',
        postcode: '66470',
        registerType: 'individual',
        timeZone: 'Etc/GMT-11',
        status: 'Active',
      },
      message: 'Success',
    };
    const showProxyLoginCTA = jest.spyOn(getInstance(), 'showProxyLoginCTA');
    showProxyLoginCTA(recruiterData);
    expect(showProxyLoginCTA).toHaveBeenCalledTimes(1);
  });
});
