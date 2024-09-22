/*
 * PersonalDetails Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';
import {
  CHANGE_NAME,
  CHANGE_BRAND,
  CHANGE_REGISTER_NUMBER,
  CHANGE_VAT_NUMBER,
  CHANGE_ADDRESS_LINE_ONE,
  CHANGE_ADDRESS_LINE_TWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_LINKEDIN_URL,
  CHANGE_POSTCODE,
  CHANGE_STATE,
  CHANGE_WEBSITE_URL,
} from './constants';

// The initial state of the App
export const initialState = {
  name: '',
  brand: '',
  registeredNumber: '',
  vatNumber: '',
  linkedInUrl: '',
  websiteUrl: '',
  country: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  state: '',
  postcode: '',
};

const aboutCompanyReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_BRAND:
        draft.brand = action.payload;
        break;
      case CHANGE_REGISTER_NUMBER:
        draft.registeredNumber = action.payload;
        break;
      case CHANGE_VAT_NUMBER:
        draft.vatNumber = action.payload;
        break;
      case CHANGE_ADDRESS_LINE_ONE:
        draft.addressLineOne = action.payload;
        break;
      case CHANGE_ADDRESS_LINE_TWO:
        draft.addressLineTwo = action.payload;
        break;
      case CHANGE_POSTCODE:
        draft.postcode = action.payload;
        break;
      case CHANGE_LINKEDIN_URL:
        draft.linkedInUrl = action.payload;
        break;
      case CHANGE_WEBSITE_URL:
        draft.websiteUrl = action.payload;
        break;
      case CHANGE_STATE:
        draft.state = action.payload;
        break;
      case CHANGE_CITY:
        draft.city = action.payload;
        break;
      case CHANGE_COUNTRY:
        draft.country = action.payload;
        break;
      default:
    }
    return draft;
  });

export default aboutCompanyReducer;
