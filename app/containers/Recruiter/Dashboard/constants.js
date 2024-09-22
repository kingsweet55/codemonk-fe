/*
 * AdminProjects Constants
 */

export const key = 'InviteTalents';

export const DEFAULT_PAGE_NO = 1;

export const inviteTalentColumns = [
  {
    name: 'Email',
    selector: 'email',
    minWidth: '180px',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Invited On',
    selector: 'referredOn',
    sortable: true,
  },
  {
    name: 'Signed-up',
    selector: 'signedUp',
    sortable: true,
  },
  {
    name: 'Vetted On',
    selector: 'vettedOn',
  },
  {
    name: 'Hired On',
    selector: 'hiredOn',
  },
  {
    name: 'Status',
    selector: 'status',
    maxWidth: '150px',
    style: {
      paddingRight: '20px',
    },
  },
];
