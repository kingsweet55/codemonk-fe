/**
 * About you selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const aboutYouForm = state => state.aboutYou || initialState;

const makeSelectFirstName = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.firstName,
  );

const makeSelectLastName = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.lastName,
  );

const makeSelectJobTitle = () =>
  createSelector(
    aboutYouForm,
    aboutYouState => aboutYouState.jobTitle,
  );

export { aboutYouForm, makeSelectFirstName, makeSelectLastName, makeSelectJobTitle };
