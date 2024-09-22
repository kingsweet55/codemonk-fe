/*
 * AdminClients Constants
 */

export const key = 'AdminAmbassadors';
export const CHANGE_RECRUITER_STATUS = 'CodeMonk/AdminAmbassadors/CHANGE_STATUS';
export const DEFAULT_PAGE_NO = 1;

export const columns = [
  {
    name: 'SL no',
    selector: 'number',
    maxWidth: '110px',
    style: {
      paddingLeft: '40px',
    },
  },
  {
    name: 'Full name',
    selector: 'name',
  },
  {
    name: 'Company Name',
    selector: 'companyName',
  },
  {
    name: 'Email',
    selector: 'email',
  },
  {
    name: 'Status',
    selector: 'status',
  },
  {
    name: 'Action',
    selector: 'action',
    allowOverflow: true,
    style: {
      paddingRight: '40px',
    },
  },
];

export const ambassadorActionStatusArray = [
  {
    label: 'All',
    value: -1,
  },
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Suspend',
    value: 2,
  },
  {
    label: 'Registered',
    value: 0,
  },
];
