import { CHANGE_RECRUITER_STATUS } from './constants';

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_RECRUITER_STATUS,
    data,
    onSuccess,
  };
}
