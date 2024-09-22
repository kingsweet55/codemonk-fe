import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { Talents as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeStatus: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Projects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleChangeStatus', () => {
    const handleChangeStatus = jest.spyOn(getInstance(), 'handleChangeStatus');
    const talentId = 'ajhfda8';
    const selectedVal = { label: 'Active', value: '1' };
    handleChangeStatus(talentId, selectedVal);
    expect(handleChangeStatus).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSearchChange', () => {
    const handleSearchChange = jest.spyOn(getInstance(), 'handleSearchChange');
    const value = 'user';
    handleSearchChange(value);
    expect(handleSearchChange).toHaveBeenCalledTimes(1);
  });
});
