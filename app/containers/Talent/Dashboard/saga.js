/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { repoLoadingError, reset, popUpSagaAction } from 'containers/App/actions';
import {
  toastMessages,
  API_URL,
  TALENT,
  INVITE,
  AGENCY,
  RECRUITER,
  TALENT_INVITE_API,
  CLIENT_INVITE_API,
  VERSION2,
  AMBASSADOR,
} from 'containers/App/constants';
import { getUserType } from 'utils/Helper';
import { ToastifyMessage } from 'components';
import { SUBMIT_INVITE_MAILS, SUBMIT_ADD_TALENT } from './constants';
import { makeSelectInviteMails, makeSelectReferEarnType } from './selectors';

export function* submitInviteMails() {
  const inviteMails = yield select(makeSelectInviteMails());
  const referEarnType = yield select(makeSelectReferEarnType());
  const newInviteMails = [];
  for (let i = 0; i < inviteMails.length; i++) {
    if (inviteMails[i].email !== '') {
      const projectData = {
        name: inviteMails[i].name,
        email: inviteMails[i].email,
      };
      newInviteMails.push(projectData);
    }
  }

  const body = { emails: newInviteMails };

  const apiCallData = {
    method: 'POST',
    body,
  };
  const userType = getUserType();
  let requestURL = `${API_URL}${TALENT}${INVITE}`;
  if (userType === 'talent-partner') {
    requestURL = `${API_URL}${VERSION2}${RECRUITER}${TALENT_INVITE_API}`;
  }
  if (userType === 'ambassador') {
    if (referEarnType === TALENT) {
      requestURL = `${API_URL}${VERSION2}${AMBASSADOR}${TALENT_INVITE_API}`;
    } else {
      requestURL = `${API_URL}${VERSION2}${AMBASSADOR}${CLIENT_INVITE_API}`;
    }
  }

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(popUpSagaAction(false));
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}
export function* submitAddTalents(data) {
  const formData = data.data;

  const body = formData;

  const apiCallData = {
    method: 'POST',
    body,
  };
  let requestURL = '';

  requestURL = `${API_URL}${AGENCY}${TALENT}`;

  try {
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(popUpSagaAction(false));
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
    } else {
      yield put(reset());
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'message')));
    }
  } catch (err) {
    yield put(reset());
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(SUBMIT_INVITE_MAILS, submitInviteMails);
  yield takeLatest(SUBMIT_ADD_TALENT, submitAddTalents);
}
