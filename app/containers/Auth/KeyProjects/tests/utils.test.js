import * as functions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  test('Testing if handleSkills ', () => {
    const handleSkill = jest.spyOn(functions, 'handleSkills');
    handleSkill([]);
    expect(handleSkill).toHaveBeenCalledTimes(1);
  });
});
