/*
 * ClientBriefsDetail Messages
 *
 * This contains all the text for the ClientBriefsDetail component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.ClientBriefsDetail';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Brief Detail',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Brief Detail',
  },
  jobDetails: {
    id: `${scope}.jobDetails`,
    defaultMessage: 'Job details',
  },
  btnBackToBriefs: {
    id: `${scope}.btnBackToBriefs`,
    defaultMessage: 'Back to briefs',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Project Title:',
  },
  projectDescription: {
    id: `${scope}.projectDescription`,
    defaultMessage: 'Project Description:',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  notReceived: {
    id: `${scope}.notReceived`,
    defaultMessage: 'Not received',
  },
  noTalent: {
    id: `${scope}.noTalent`,
    defaultMessage: 'There is currently no application on this brief',
  },
  noApplicants: {
    id: `${scope}.noApplicants`,
    defaultMessage: 'You have not received any interest yet from our talent network',
  },
  noInterviewed: {
    id: `${scope}.noInterviewed`,
    defaultMessage: 'You have not requested to interview any talent for this role',
  },
  noShortListed: {
    id: `${scope}.noShortListed`,
    defaultMessage: 'You have not shortlisted any talent for this role',
  },
  noHired: {
    id: `${scope}.noHired`,
    defaultMessage: 'You have not hired any talent for this role',
  },
  noRejected: {
    id: `${scope}.noRejected`,
    defaultMessage: 'You have not rejected any talent for this role',
  },

  // backToBrief
  backToBriefs: {
    id: `${scope}.backToBriefs`,
    defaultMessage: 'Back to briefs',
  },
  backToProjectDetails: {
    id: `${scope}.backToProjectDetails`,
    defaultMessage: 'Back to project details',
  },

  hiringTabRecommended: {
    id: `${scope}.hiringTabRecommended`,
    defaultMessage: 'Recommended',
  },
  hiringTabApplications: {
    id: `${scope}.hiringTabApplications`,
    defaultMessage: 'Applications',
  },
  hiringTabInterviewed: {
    id: `${scope}.hiringTabInterviewed`,
    defaultMessage: 'Interviewed',
  },
  hiringTabShortlisted: {
    id: `${scope}.hiringTabShortlisted`,
    defaultMessage: 'Shortlisted',
  },
  hiringTabHired: {
    id: `${scope}.hiringTabHired`,
    defaultMessage: 'Hired',
  },
  hiringTabRejected: {
    id: `${scope}.hiringTabRejected`,
    defaultMessage: 'Rejected',
  },
  archived: {
    id: `${scope}.archived`,
    defaultMessage: 'Archived',
  },
  jobDescription: {
    id: `${scope}.jobDescription`,
    defaultMessage: 'Job Description',
  },
  searchCandidate: {
    id: `${scope}.searchCandidate`,
    defaultMessage: 'Search more candidates',
  },
});
