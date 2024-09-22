import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from '../PageTitle';

describe('Test functions', () => {
  const getWrapper = () => shallow(<PageTitle />);
  const getInstance = () => getWrapper().instance();

  test('Testing if menuToggle', () => {
    const menuToggle = jest.spyOn(getInstance(), 'menuToggle');
    menuToggle();
    expect(menuToggle).toHaveBeenCalledTimes(1);
  });
});
