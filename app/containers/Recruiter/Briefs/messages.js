/*
 * RecruiterBriefs Messages
 *
 * This contains all the text for the RecruiterBriefs component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.RecruiterBriefs';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Job briefs',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Job briefs',
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: 'Job briefs',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'Project Title:',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description:',
  },
  modelFiltersHeader: {
    id: `${scope}.modelFiltersHeader`,
    defaultMessage: 'Filters',
  },
});
