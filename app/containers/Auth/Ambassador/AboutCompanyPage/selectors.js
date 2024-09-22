/**
 * About you selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const aboutCompanyForm = state => state.aboutCompany || initialState;

const makeSelectName = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.name,
  );
const makeSelectBrand = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.brand,
  );
const makeSelectRegisteredNumber = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.registeredNumber,
  );
const makeSelectVatNumber = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.vatNumber,
  );
const makeSelectPostcode = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.postcode,
  );
const makeSelectLinkedInUrl = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.linkedInUrl,
  );
const makeSelectWebsiteUrl = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.websiteUrl,
  );
const makeSelectCountry = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.country,
  );
const makeSelectAddressLineOne = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.addressLineOne,
  );
const makeSelectAddressLineTwo = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.addressLineTwo,
  );
const makeSelectCity = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.city,
  );
const makeSelectState = () =>
  createSelector(
    aboutCompanyForm,
    aboutCompanyState => aboutCompanyState.state,
  );

export {
  makeSelectName,
  makeSelectBrand,
  makeSelectRegisteredNumber,
  makeSelectVatNumber,
  makeSelectPostcode,
  makeSelectLinkedInUrl,
  makeSelectWebsiteUrl,
  makeSelectCountry,
  makeSelectAddressLineOne,
  makeSelectAddressLineTwo,
  makeSelectCity,
  makeSelectState,
  aboutCompanyForm,
};
