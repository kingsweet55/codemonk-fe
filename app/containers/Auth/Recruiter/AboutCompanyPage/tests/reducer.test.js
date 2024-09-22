import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      name: '',
      brand: '',
      registeredNumber: '',
      vatNumber: '',
      postcode: '',
      linkedInUrl: '',
      websiteUrl: '',
      country: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
    },
    config,
  );
describe('Experiences reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_NAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_NAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ name: '' }));
  });
  it('should handle CHANGE_BRAND', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_BRAND,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ brand: '' }));
  });
  it('should handle CHANGE_REGISTER_NUMBER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_REGISTER_NUMBER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ registeredNumber: '' }));
  });
  it('should handle CHANGE_VAT_NUMBER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_VAT_NUMBER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ vatNumber: '' }));
  });
  it('should handle CHANGE_POSTCODE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_POSTCODE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ postcode: '' }));
  });
  it('should handle CHANGE_LINKEDIN_URL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_LINKEDIN_URL,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ linkedInUrl: '' }));
  });
  it('should handle CHANGE_WEBSITE_URL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_WEBSITE_URL,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ websiteUrl: '' }));
  });
  it('should handle CHANGE_COUNTRY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COUNTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ country: '' }));
  });
  it('should handle CHANGE_ADDRESS_LINE_ONE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ADDRESS_LINE_ONE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ addressLineOne: '' }));
  });
  it('should handle CHANGE_ADDRESS_LINE_TWO', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ADDRESS_LINE_TWO,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ addressLineTwo: '' }));
  });
  it('should handle CHANGE_CITY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CITY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ city: '' }));
  });
  it('should handle CHANGE_STATE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_STATE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ state: '' }));
  });
});
