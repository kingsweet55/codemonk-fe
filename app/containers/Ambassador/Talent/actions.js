import { CHANGE_AMBASSADOR_STATUS } from './constants';

export function changeStatus(data, onSuccess) {
  return {
    type: CHANGE_AMBASSADOR_STATUS,
    data,
    onSuccess,
  };
}
