import { makeSelectFirstName, makeSelectLastName, makeSelectJobTitle } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectFirstName', () => {
    const mockState = {
      aboutYouForm: {
        firstName: '',
      },
    };
    const result = {
      firstName: '',
    };
    const sel = makeSelectFirstName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectLastName', () => {
    const mockState = {
      aboutYouForm: {
        lastName: '',
      },
    };
    const result = {
      lastName: '',
    };
    const sel = makeSelectLastName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectJobTitle', () => {
    const mockState = {
      aboutYouForm: {
        jobTitle: '',
      },
    };
    const result = {
      jobTitle: '',
    };
    const sel = makeSelectJobTitle(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
