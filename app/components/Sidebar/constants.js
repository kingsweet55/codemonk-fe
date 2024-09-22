import {
  TALENT_PARTNER,
  AGENCY,
  TALENT,
  CLIENT,
  ADMIN,
  projectsIcon,
  userIcon,
  calendarWithTimeIcon,
  quotesIcon,
  dollarIcon,
  clientsIcon,
  dashboardIcon,
  textFileIcon,
  builidingIcon,
  searchJobsIcon,
  recruiterIcon,
  ambassadorIcon,
  AMBASSADOR,
} from 'containers/App/constants';

export const clientNavPages = [
  {
    title: 'Dashboard',
    pathName: `${CLIENT}/dashboard`,
    icon: dashboardIcon,
    paths: ['/', `${CLIENT}`, `${CLIENT}/`, `${CLIENT}/dashboard`, `${CLIENT}/dashboard/`],
    isBadgeConfig: false,
  },
  {
    title: 'Job Briefs',
    pathName: `${CLIENT}/job-briefs`,
    icon: textFileIcon,
    paths: [`${CLIENT}/job-briefs`, `${CLIENT}/job-briefs/`],
    isBadgeConfig: false,
  },
  {
    title: 'Projects',
    pathName: `${CLIENT}/projects`,
    icon: projectsIcon,
    paths: [`${CLIENT}/projects`, `${CLIENT}/projects/`],
    isBadgeConfig: false,
  },
  {
    title: 'Talents',
    pathName: `${CLIENT}/talents`,
    icon: clientsIcon,
    paths: [`${CLIENT}/talents`, `${CLIENT}/talents`],
    isBadgeConfig: false,
  },
  {
    title: 'Timesheets',
    pathName: `${CLIENT}/timesheets`,
    icon: calendarWithTimeIcon,
    paths: [`${CLIENT}/timesheets`, `${CLIENT}/timesheets`],
    isBadgeConfig: true,
    badgeKey: 'newTimesheet',
  },
  /* For Future use
  {
    title: 'Bill',
    pathName: `${CLIENT}/billing`,
    icon: billIcon,
    paths: [`${CLIENT}/billing`, `${CLIENT}/billing`],
    isBadgeConfig: false,
  },
  {
    title: 'Contracts',
    pathName: `${CLIENT}/contracts`,
    icon: contractIcon,
    paths: [`${CLIENT}/contracts`, `${CLIENT}/contracts`],
    isBadgeConfig: false,
  },
  {
    title: 'Payments',
    pathName: `${CLIENT}/payments`,
    icon: paymentIcon,
    paths: [`${CLIENT}/payments`, `${CLIENT}/payments`],
    isBadgeConfig: false,
  },
  */
];

export const adminNavPages = [
  {
    title: 'Dashboard',
    pathName: `${ADMIN}/dashboard`,
    icon: dashboardIcon,
    paths: ['/', `${ADMIN}`, `${ADMIN}/`, `${ADMIN}/dashboard`, `${ADMIN}/dashboard/`],
    isBadgeConfig: false,
  },
  {
    title: 'Projects',
    pathName: `${ADMIN}/projects`,
    icon: projectsIcon,
    paths: [`${ADMIN}/projects`, `${ADMIN}/projects`],
    isBadgeConfig: false,
  },
  {
    title: 'Job Briefs',
    pathName: `${ADMIN}/job-briefs`,
    icon: textFileIcon,
    paths: [`${ADMIN}/job-briefs`, `${ADMIN}/job-briefs`],
    isBadgeConfig: false,
  },
  {
    title: 'Interviews',
    pathName: `${ADMIN}/interviews`,
    icon: calendarWithTimeIcon,
    paths: [`${ADMIN}/interviews`, `${ADMIN}/interviews`],
    isBadgeConfig: false,
  },
  {
    title: 'Quotes',
    pathName: `${ADMIN}/quotes`,
    icon: quotesIcon,
    paths: [`${ADMIN}/quotes`, `${ADMIN}/quotes`],
    isBadgeConfig: false,
  },
  {
    title: 'Talents',
    pathName: `${ADMIN}/talents`,
    icon: clientsIcon,
    paths: [`${ADMIN}/talents`, `${ADMIN}/talents`],
    isBadgeConfig: false,
  },
  {
    title: 'Timesheets',
    pathName: `${ADMIN}/timesheets`,
    icon: calendarWithTimeIcon,
    paths: [`${ADMIN}/timesheets`, `${ADMIN}/timesheets`],
    isBadgeConfig: false,
  },
  {
    title: 'Clients',
    pathName: `${ADMIN}/clients`,
    icon: userIcon,
    paths: [`${ADMIN}/clients`, `${ADMIN}/clients`],
    isBadgeConfig: false,
  },
  {
    title: 'Agencies',
    pathName: `${ADMIN}/agencies`,
    icon: builidingIcon,
    paths: [`${ADMIN}/agencies`, `${ADMIN}/agencies`],
    isBadgeConfig: false,
  },
  {
    title: 'Referrals',
    pathName: `${ADMIN}/referrals`,
    icon: dollarIcon,
    paths: [`${ADMIN}/referrals`, `${ADMIN}/referrals`],
    isBadgeConfig: false,
  },
  {
    title: 'Talent partners',
    pathName: `${ADMIN}/talent-partners`,
    icon: recruiterIcon,
    paths: [`${ADMIN}/talent-partners`, `${ADMIN}/talent-partners`],
    isBadgeConfig: false,
  },
  {
    title: 'Ambassadors',
    pathName: `${ADMIN}/ambassadors`,
    icon: ambassadorIcon,
    paths: [`${ADMIN}/ambassadors`, `${ADMIN}/ambassadors`],
    isBadgeConfig: false,
  },
];

export const talentNavPages = [
  {
    title: 'Dashboard',
    pathName: `${TALENT}/dashboard`,
    icon: dashboardIcon,
    paths: ['/', `${TALENT}`, `${TALENT}/`, `${TALENT}/dashboard`, `${TALENT}/dashboard/`],
    isBadgeConfig: false,
  },
  {
    title: 'Jobs',
    pathName: `${TALENT}/job-briefs`,
    icon: searchJobsIcon,
    paths: [`${TALENT}/job-briefs`, `${TALENT}/job-briefs`],
    isBadgeConfig: true,
    badgeKey: 'newBrief',
  },
  {
    title: 'Projects',
    pathName: `${TALENT}/my-projects`,
    icon: projectsIcon,
    paths: [`${TALENT}/my-projects`, `${TALENT}/my-projects`],
    isBadgeConfig: false,
  },
  {
    title: 'Timesheets',
    pathName: `${TALENT}/timesheets`,
    icon: calendarWithTimeIcon,
    paths: [`${TALENT}/timesheets`, `${TALENT}/timesheets`],
    isBadgeConfig: false,
  },
  /* For Future use
  {
    title: 'Invoices',
    pathName: `${TALENT}/invoices`,
    icon: billIcon,
    paths: [`${TALENT}/invoices`, `${TALENT}/invoices`],
    isBadgeConfig: false,
  },
  {
    title: 'Knowledge base',
    pathName: `${TALENT}/knowledge-base`,
    icon: booksIcon,
    paths: [`${TALENT}/knowledge-base`, `${TALENT}/knowledge-base`],
    isBadgeConfig: false,
  },
  {
    title: 'Community',
    pathName: `${TALENT}/community`,
    icon: communityIcon,
    paths: [`${TALENT}/community`, `${TALENT}/community`],
    isBadgeConfig: false,
  },
  {
    title: 'Career Paths',
    pathName: `${TALENT}/career-paths`,
    icon: briefcaseIcon,
    paths: [`${TALENT}/career-paths`, `${TALENT}/career-paths`],
    isBadgeConfig: false,
  },
  {
    title: 'Learning Development',
    pathName: `${TALENT}/learning-development`,
    icon: learningIcon,
    paths: [`${TALENT}/learning-development`, `${TALENT}/learning-development`],
    isBadgeConfig: false,
  },
  {
    title: 'Perks',
    pathName: `${TALENT}/perks`,
    icon: perksIcon,
    paths: [`${TALENT}/perks`, `${TALENT}/perks`],
    isBadgeConfig: false,
  },
  {
    title: 'Wellbeing',
    pathName: `${TALENT}/wellbeing`,
    icon: heartIcon,
    paths: [`${TALENT}/wellbeing`, `${TALENT}/wellbeing`],
    isBadgeConfig: false,
  },
  */
];

export const agencyNavPages = [
  {
    title: 'Dashboard',
    pathName: `${AGENCY}/dashboard`,
    icon: dashboardIcon,
    paths: ['/', `${AGENCY}`, `${AGENCY}/`, `${AGENCY}/dashboard`, `${AGENCY}/dashboard/`],
    isBadgeConfig: false,
  },
  {
    title: 'Quotes',
    pathName: `${AGENCY}/quotes`,
    icon: quotesIcon,
    paths: [`${AGENCY}/quotes`, `${AGENCY}/quotes`],
    isBadgeConfig: true,
    badgeKey: 'newQuote',
  },
  {
    title: 'Projects',
    pathName: `${AGENCY}/agency-projects`,
    icon: projectsIcon,
    paths: [`${AGENCY}/agency-projects`, `${AGENCY}/agency-projects`],
    isBadgeConfig: false,
  },
  {
    title: 'My Team',
    pathName: `${AGENCY}/my-team`,
    icon: clientsIcon,
    paths: [`${AGENCY}/my-team`, `${AGENCY}/my-team`],
    isBadgeConfig: false,
  },
  {
    title: 'Timesheets',
    pathName: `${AGENCY}/timesheets`,
    icon: calendarWithTimeIcon,
    paths: [`${AGENCY}/timesheets`, `${AGENCY}/timesheets`],
    isBadgeConfig: false,
  },
  /* For Future use
  {
    title: 'Invoices',
    pathName: `${AGENCY}/invoices`,
    icon: billIcon,
    paths: [`${AGENCY}/invoices`, `${AGENCY}/invoices`],
    isBadgeConfig: false,
  },
  {
    title: 'Statements',
    pathName: `${AGENCY}/agency-statements`,
    icon: textFileIcon,
    paths: [`${AGENCY}/agency-statements`, `${AGENCY}/agency-statements`],
    isBadgeConfig: false,
  },
  {
    title: 'Planning',
    pathName: `${AGENCY}/agency-planning`,
    icon: billIcon,
    paths: [`${AGENCY}/agency-planning`, `${AGENCY}/agency-planning`],
    isBadgeConfig: false,
  },
  */
];

export const recruiterNavPages = [
  {
    title: 'Dashboard',
    pathName: `${TALENT_PARTNER}/dashboard`,
    icon: dashboardIcon,
    paths: ['/', `${TALENT_PARTNER}`, `${TALENT_PARTNER}/`, `${TALENT_PARTNER}/dashboard`, `${TALENT_PARTNER}/dashboard/`],
    isBadgeConfig: false,
  },
  /* For Future use
  {
    title: 'Talents',
    pathName: `${TALENT_PARTNER}/talents`,
    icon: clientsIcon,
    paths: [`${TALENT_PARTNER}/talents`, `${TALENT_PARTNER}/talents`],
    isBadgeConfig: false,
  },
   */
  {
    title: 'Job Briefs',
    pathName: `${TALENT_PARTNER}/job-briefs`,
    icon: textFileIcon,
    paths: [`${TALENT_PARTNER}/job-briefs`, `${TALENT_PARTNER}/job-briefs/`],
    isBadgeConfig: false,
  },
];

export const ambassadorNavPages = [
  {
    title: 'Dashboard',
    pathName: `${AMBASSADOR}/dashboard`,
    icon: dashboardIcon,
    paths: ['/', `${AMBASSADOR}`, `${AMBASSADOR}/`, `${AMBASSADOR}/dashboard`, `${AMBASSADOR}/dashboard/`],
    isBadgeConfig: false,
  },
  /* {
    title: 'Talents',
    pathName: `${AMBASSADOR}/talents`,
    icon: clientsIcon,
    paths: [`${AMBASSADOR}/talents`, `${AMBASSADOR}/talents/`],
    isBadgeConfig: false,
  }, */
];
