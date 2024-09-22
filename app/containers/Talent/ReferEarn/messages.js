/*
 * Talent Projects Messages
 */
import { defineMessages } from 'react-intl';
export const scope = 'CodeMonk.containers.TalentProjects';

export default defineMessages({
  inviteNow: {
    id: `${scope}.inviteNow`,
    defaultMessage: 'Invite Now',
  },
  referModalTitle: {
    id: `${scope}.referModalTitle`,
    defaultMessage: 'Refer and earn exciting rewards',
  },
  referModalText: {
    id: `${scope}.referModalText`,
    defaultMessage:
      'Simply refer your best colleagues you would like to work more often with. When they sign-up and complete their profile, you both will earn a success fee',
  },
  referModalAmbassadorTalentText: {
    id: `${scope}.referModalAmbassadorTalentText`,
    defaultMessage:
      'Simply invite your talent to sign-up to CodeMonk using your unique invitation link or invite them by clicking the button below.',
  },
  referModalAmbassadorClientText: {
    id: `${scope}.referModalAmbassadorClientText`,
    defaultMessage:
      'Simply invite the decision makers at the comanies actively looking to hire remote talents. When they build their teams through our platform, you will earn exciting rewards including cash payouts.',
  },
  subjectToOurTerms: {
    id: `${scope}.subjectToOurTerms`,
    defaultMessage: 'Subject to our terms',
  },
  backTonviteLink: {
    id: `${scope}.backTonviteLink`,
    defaultMessage: 'Back to invite link',
  },
  inviteMailHeadingForRecruiter: {
    id: `${scope}.inviteMailHeadingForRecruiter`,
    defaultMessage: 'Refer and earn cash per referral.',
  },
  inviteMailContentForRecruiter: {
    id: `${scope}.inviteMailContentForRecruiter`,
    defaultMessage: 'Simply invite your talent to sign-up to CodeMonk using their email address.',
  },
  inviteMailContentForClientTab: {
    id: `${scope}.inviteMailContentForClientTab`,
    defaultMessage: 'Simply invite your clients to sign-up to CodeMonk using their email address.',
  },
});
