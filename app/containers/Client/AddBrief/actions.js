import { SAVE_BRIEF_STEP3 } from './constants';

export function submitBriefStep3Form(payload, data, onSuccess) {
  return {
    type: SAVE_BRIEF_STEP3,
    payload,
    data,
    onSuccess,
  };
}
