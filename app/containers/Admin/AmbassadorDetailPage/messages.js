/*
 * AmbassadorDetailPage Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'CodeMonk.containers.AmbassadorDetailPage';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Ambassador Detail',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Ambassador Detail',
  },
  backToAmbassador: {
    id: `${scope}.backToAmbassador`,
    defaultMessage: 'Back to ambassadors list',
  },
  titleBasic: {
    id: `${scope}.titleBasic`,
    defaultMessage: 'Basic',
  },
  titleLogo: {
    id: `${scope}.titleLogo`,
    defaultMessage: 'Logo',
  },
  labelCompanyLogo: {
    id: `${scope}.labelCompanyLogo`,
    defaultMessage: 'Company logo',
  },
  titleAmbassadorDetails: {
    id: `${scope}.titleAmbassadorDetails`,
    defaultMessage: 'Ambassador details',
  },
  brandName: {
    id: `${scope}.brandName`,
    defaultMessage: 'Brand name',
  },
});
