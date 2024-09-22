import React from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import Emitter from 'utils/emitter';
import { VALIDATION } from 'utils/constants';
import { repoLoadingError, reset } from 'containers/App/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import request from 'utils/request';
import { getUserRoleFromURL } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import { ToastifyMessage } from 'components';
import AuthTokenService from 'utils/AuthTokenService';
import {
  TALENT,
  AGENCY,
  CLIENT,
  TALENT_PARTNER,
  toastMessages,
  VERIFY,
  RESEND_CODE,
  API_URL,
  AUTH,
  VERIFY_ACCOUNT,
  RESEND_OTP_API,
  AMBASSADOR,
} from 'containers/App/constants';
import { makeSelectOTP } from './selectors';
import { resetOTP } from './actions';
/**
 * user Forget request/response handler
 */
export function* getVerification() {
  let otp = yield select(makeSelectOTP());
  otp = Number(otp);
  const email = StorageService.get('userEmail');
  const data = {
    method: 'POST',
    body: {
      email,
      otp,
    },
  };
  const location = yield select(makeSelectLocation());
  const requestURL = `${API_URL}${AUTH}${VERIFY_ACCOUNT}`;
  let pathname;
  let userType;
  if (getUserRoleFromURL() === 'talent') {
    pathname = `${TALENT}/about-you`;
    userType = 1;
  } else if (getUserRoleFromURL() === 'agency') {
    pathname = `${AGENCY}/registration-type`;
    userType = 3;
  } else if (getUserRoleFromURL() === 'client') {
    pathname = `${CLIENT}/about-you`;
    userType = 2;
  } else if (getUserRoleFromURL() === 'talent-partner') {
    pathname = `${TALENT_PARTNER}/about-you`;
    userType = 5;
  } else if (getUserRoleFromURL() === 'ambassador') {
    pathname = `${AMBASSADOR}/about-you`;
    userType = 6;
  }

  try {
    const log = yield call(request, requestURL, data);
    if (get(log, 'status')) {
      AuthTokenService.storeToken(get(log, 'data.token'));
      StorageService.set('signupStep', 1, { hash: true });
      StorageService.set('userType', userType, { hash: true });
      yield put(reset());
      if (getUserRoleFromURL() === 'talent' || getUserRoleFromURL() === 'agency') {
        StorageService.set('userType', userType, { hash: true });
        StorageService.set('registerType', 'freelancer', { hash: true });
        Emitter.emit('userTypeSelected', true);
      }
      if (getUserRoleFromURL() === 'talent-partner') {
        StorageService.set('recruiterId', get(log, 'data._id'), { hash: true });
      } else if (getUserRoleFromURL() === 'ambassador') {
        StorageService.set('ambassadorId', get(log, 'data._id'), { hash: true });
      }
      yield put(push({ pathname, search: location.search }));
    } else {
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(reset());
      yield put(repoLoadingError(get(log, 'message')));
      yield put(resetOTP());
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
    yield put(reset());
    yield put(repoLoadingError(err));
    yield put(resetOTP());
  }
}

export function* resendOtp() {
  const email = StorageService.get('userEmail');
  const data = {
    method: 'POST',
    body: {
      email,
    },
  };
  const requestURL = `${API_URL}${AUTH}${RESEND_OTP_API}`;

  try {
    const log = yield call(request, requestURL, data);

    if (get(log, 'status') === 1) {
      toast.success(<ToastifyMessage message={get(log, 'message')} type="success" />, { className: 'Toast-success' });
    } else {
      toast.error(<ToastifyMessage message={get(log, 'message')} type="error" />, { className: 'Toast-error' });
      yield put(repoLoadingError(get(log, 'response.statusText')));
    }
  } catch (err) {
    toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* verification() {
  yield takeLatest(VERIFY, getVerification);
  yield takeLatest(RESEND_CODE, resendOtp);
}
