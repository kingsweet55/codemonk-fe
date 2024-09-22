import { CHANGE_FIRSTNAME, CHANGE_LASTNAME, CHANGE_JOB_TITLE, SUBMIT_ABOUT_YOU_FORM } from './constants';

export function changeFirstName(payload) {
  return {
    type: CHANGE_FIRSTNAME,
    payload,
  };
}
export function changeLastName(payload) {
  return {
    type: CHANGE_LASTNAME,
    payload,
  };
}
export function changeJobTitle(payload) {
  return {
    type: CHANGE_JOB_TITLE,
    payload,
  };
}

export function submitAboutYouForm(payload, data) {
  return {
    type: SUBMIT_ABOUT_YOU_FORM,
    payload,
    data,
  };
}
