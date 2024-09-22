/**
 * Gets the repositories of the user from Github
 */
import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import StorageService from 'utils/StorageService';
import ToastifyMessage from 'components/ToastifyMessage';
import { ambassadorRedirectPageURL } from 'containers/App/utils';
import { repoLoadingError, isLoading, reset } from 'containers/App/actions';
import { API_URL, SAVE_LATER_API, ABOUT_YOU_API, AMBASSADOR, AMBASSADOR_DASHBOARD } from 'containers/App/constants';
import request from 'utils/request';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { SUBMIT_ABOUT_YOU_FORM } from './constants';

/**
 * user Forget request/response handler
 */
export function* getAboutYouDetails(data) {
  const { payload: submitType, data: body } = data;

  const apiCallData = { method: 'PUT', body };

  let requestURL = '';
  if (submitType === 'saveForLater') {
    apiCallData.body.step = 1;
    requestURL = `${API_URL}${AMBASSADOR}${SAVE_LATER_API}`;
  } else if (submitType === 'continue') {
    requestURL = `${API_URL}${AMBASSADOR}${ABOUT_YOU_API}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const log = yield call(request, requestURL, apiCallData);
    if (get(log, 'status')) {
      yield put(reset());
      yield put(isLoading(false));
      if (submitType === 'continue') {
        storeApiSignupStep(get(log, 'data.signupStep'));
        const signupStep = 1;
        StorageService.set('signupStep', signupStep, { hash: true });
        const pathname = ambassadorRedirectPageURL(1);
        yield put(push({ pathname }));
      } else if (submitType === 'saveForLater') {
        StorageService.set('signupStep', 2, { hash: true }); /* 2 - Dashboard */
        toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, {
          className: 'Toast-success',
        });
        yield put(push({ pathname: AMBASSADOR_DASHBOARD }));
      }
    } else {
      toast.error(log.message, { className: 'Toast-error' });
      yield put(repoLoadingError(log.response.statusText));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* aboutYouForm() {
  yield takeLatest(SUBMIT_ABOUT_YOU_FORM, getAboutYouDetails);
}
