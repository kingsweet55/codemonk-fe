import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { initialState } from './reducer';
import { key } from './constants';

const InterviewTalentForm = state => state.InterviewTalentForm || initialState;
const makeSelectInterviewSlot = () =>
  createSelector(
    InterviewTalentForm,
    formState => formState.interviewSlotArray,
  );

// field selectors
const formSelector = formValueSelector(key);
const projectName = state => formSelector(state, 'projectName');
const projectSummary = state => formSelector(state, 'projectSummary');

export { InterviewTalentForm, makeSelectInterviewSlot, projectName, projectSummary };
