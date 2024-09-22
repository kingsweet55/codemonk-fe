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
  SUBMIT_ABOUT_COMPANY_FORM,
} from './constants';

export function changeName(payload) {
  return {
    type: CHANGE_NAME,
    payload,
  };
}

export function changeBrand(payload) {
  return {
    type: CHANGE_BRAND,
    payload,
  };
}

export function changeRegisteredNumber(payload) {
  return {
    type: CHANGE_REGISTER_NUMBER,
    payload,
  };
}

export function changeVatNumber(payload) {
  return {
    type: CHANGE_VAT_NUMBER,
    payload,
  };
}

export function changeAddressLineOne(payload) {
  return {
    type: CHANGE_ADDRESS_LINE_ONE,
    payload,
  };
}

export function changeAddressLineTwo(payload) {
  return {
    type: CHANGE_ADDRESS_LINE_TWO,
    payload,
  };
}

export function changeCity(payload) {
  return {
    type: CHANGE_CITY,
    payload,
  };
}

export function changeCountry(payload) {
  return {
    type: CHANGE_COUNTRY,
    payload,
  };
}

export function changeLinkedinURL(payload) {
  return {
    type: CHANGE_LINKEDIN_URL,
    payload,
  };
}

export function changePostcode(payload) {
  return {
    type: CHANGE_POSTCODE,
    payload,
  };
}

export function changeState(payload) {
  return {
    type: CHANGE_STATE,
    payload,
  };
}

export function changeWebsiteURL(payload) {
  return {
    type: CHANGE_WEBSITE_URL,
    payload,
  };
}

export function submitAboutCompanyForm(payload, data) {
  return {
    type: SUBMIT_ABOUT_COMPANY_FORM,
    payload,
    data,
  };
}
