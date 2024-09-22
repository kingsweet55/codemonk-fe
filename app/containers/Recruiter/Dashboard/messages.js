/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Recruiter.Dashboard';

export default defineMessages({
  title: {
    id: `${scope}.title.head`,
    defaultMessage: 'Dashboard',
  },
  metaTitle: {
    id: `${scope}.metaTitle.head`,
    defaultMessage: 'Dashboard',
  },
  startedTitle: {
    id: `${scope}.startedTitle`,
    defaultMessage: 'Get started here',
  },
  yourTalentsTitle: {
    id: `${scope}.yourTalentsTitle`,
    defaultMessage: 'Your talents',
  },
  yourClientsTitle: {
    id: `${scope}.yourClientsTitle`,
    defaultMessage: 'Your clients',
  },
  inviteContent: {
    id: `${scope}.inviteContent`,
    defaultMessage:
      'Simply invite your talent to sign-up to CodeMonk using your unique invitation link or invite them by clicking the button below.',
  },
  notInvited: {
    id: `${scope}.NotInvited`,
    defaultMessage: 'Not invited yet',
  },
  notInvitedContent: {
    id: `${scope}.NotInvitedContent`,
    defaultMessage: 'You didn’t invite any talent yet. Please invite talents to sign-up to CodeMonk and get referral rewards.',
  },
  notInvitedClientContent: {
    id: `${scope}.notInvitedClientContent`,
    defaultMessage: 'You didn’t invite any client yet. Please invite clients to sign-up to CodeMonk and get referral rewards.',
  },
  dashboardInviteClientTitle: {
    id: `${scope}.dashboardInviteClientTitle`,
    defaultMessage: 'Invite companies hiring for remote talent',
  },
  dashboardInviteContent: {
    id: `${scope}.dashboardInviteContent`,
    defaultMessage:
      'Simply invite the decision makers at the comanies actively looking to hire remote talents. When they build their teams through our platform, you will earn exciting rewards including cash payouts.',
  },
});
