/*
 * Dashboard Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { TALENT } from 'containers/App/constants';
import { CHANGE_INVITE, REFER_EARN_TYPE } from './constants';

// The initial state of the App
export const initialState = {
  inviteMails: [{ name: '', email: '' }],
  referEarnType: TALENT,
};

const homeReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    if (action.type === CHANGE_INVITE) {
      draft.inviteMails = action.payload;
    }
    if (action.type === REFER_EARN_TYPE) {
      draft.referEarnType = action.data;
    }
  });

export default homeReducer;
