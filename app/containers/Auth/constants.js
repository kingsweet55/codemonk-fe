import { TALENT_PARTNER, TALENT, CLIENT, AMBASSADOR } from 'containers/App/constants';

export const TALENT_STEP_1_URL = `${TALENT}/about-you`;
export const TALENT_STEP_2_URL = `${TALENT}/qualifications`;
export const TALENT_STEP_3_URL = `${TALENT}/experience`;
export const TALENT_STEP_4_URL = `${TALENT}/projects`;
export const TALENT_STEP_5_URL = `${TALENT}/preferences`;
export const TALENT_STEP_6_URL = `${TALENT}/salary-billing`;
export const TALENT_STEP_7_URL = `${TALENT}/document-upload`;

export const TALENT_STEP_1 = 'About you';
export const TALENT_STEP_2 = 'Qualifications';
export const TALENT_STEP_3 = 'Experience';
export const TALENT_STEP_4 = 'Projects';
export const TALENT_STEP_5 = 'Preferences';
export const TALENT_STEP_6 = 'Salary & Billing';
export const TALENT_STEP_7 = 'Document upload';

export const CLIENT_STEP_1 = 'About you';
export const CLIENT_STEP_2 = 'Company';
export const CLIENT_STEP_3 = 'Locations';

export const CLIENT_STEP_1_URL = `${CLIENT}/about-you`;
export const CLIENT_STEP_2_URL = `${CLIENT}/about-company`;
export const CLIENT_STEP_3_URL = `${CLIENT}/company-location`;

export const RECRUITER_STEP_1 = 'About you';
export const RECRUITER_STEP_2 = 'Company';
export const RECRUITER_STEP_1_URL = `${TALENT_PARTNER}/about-you`;
export const RECRUITER_STEP_2_URL = `${TALENT_PARTNER}/about-company`;

export const AMBASSADOR_STEP_1 = 'About you';
export const AMBASSADOR_STEP_2 = 'Company';
export const AMBASSADOR_STEP_1_URL = `${AMBASSADOR}/about-you`;
export const AMBASSADOR_STEP_2_URL = `${AMBASSADOR}/about-company`;

export const talentOnboardingSteps = [
  {
    step: 1,
    name: TALENT_STEP_1,
    url: TALENT_STEP_1_URL,
  },
  {
    step: 2,
    name: TALENT_STEP_2,
    url: TALENT_STEP_2_URL,
  },
  {
    step: 3,
    name: TALENT_STEP_3,
    url: TALENT_STEP_3_URL,
  },
  {
    step: 4,
    name: TALENT_STEP_4,
    url: TALENT_STEP_4_URL,
  },
  {
    step: 5,
    name: TALENT_STEP_5,
    url: TALENT_STEP_5_URL,
  },
  {
    step: 6,
    name: TALENT_STEP_6,
    url: TALENT_STEP_6_URL,
  },
  {
    step: 7,
    name: TALENT_STEP_7,
    url: TALENT_STEP_7_URL,
  },
];

export const agencyTalentOnboardingSteps = [
  { ...talentOnboardingSteps[0] },
  { ...talentOnboardingSteps[1] },
  { ...talentOnboardingSteps[2] },
  { ...talentOnboardingSteps[3] },
  { ...talentOnboardingSteps[4] },
];

export const clientOnboardingSteps = [
  {
    step: 1,
    name: CLIENT_STEP_1,
    url: CLIENT_STEP_1_URL,
  },
  {
    step: 2,
    name: CLIENT_STEP_2,
    url: CLIENT_STEP_2_URL,
  },
  {
    step: 3,
    name: CLIENT_STEP_3,
    url: CLIENT_STEP_3_URL,
  },
];

export const recruiterOnboardingSteps = [
  {
    step: 1,
    name: RECRUITER_STEP_1,
    url: RECRUITER_STEP_1_URL,
  },
  {
    step: 2,
    name: RECRUITER_STEP_2,
    url: RECRUITER_STEP_2_URL,
  },
];

export const ambassadorOnboardingSteps = [
  {
    step: 1,
    name: AMBASSADOR_STEP_1,
    url: AMBASSADOR_STEP_1_URL,
  },
  {
    step: 2,
    name: AMBASSADOR_STEP_2,
    url: AMBASSADOR_STEP_2_URL,
  },
];
