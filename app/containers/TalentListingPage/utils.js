import React from 'react';
import { CardSkeleton } from 'components/SkeletonLoader';

export const sortUrl = sort => {
  let val = '';
  switch (sort) {
    case 'recommend':
      val = 'recommend';
      break;
    case 'lastest':
      val = '-_id';
      break;
    case 'oldest':
      val = '_id';
      break;
    case 'seniority':
      val = 'seniority';
      break;
    case 'aToZ':
      val = 'name';
      break;
    case 'zToA':
      val = '-name';
      break;
    case 'lowToHigh':
      val = 'experienceOrder';
      break;
    case 'highToLow':
      val = '-experienceOrder';
      break;
    /*
      Talent Project Listing page Sort
    */
    case 'talentHighToLow':
      val = 'talents._id';
      break;
    case 'talentAToZ':
      val = 'name';
      break;
    case 'talentZToA':
      val = '-name';
      break;
    default:
  }
  const url = val ? `&sort=${encodeURIComponent(val)}` : '';
  return url;
};

export const defaultSortUrl = sort => {
  let url = '';
  let val = '';
  switch (sort) {
    case 'aToZ_Name':
      val = 'name';
      break;
    case 'zToA_Name':
      val = '-name';
      break;
    case 'lowToHigh':
      val = '_id';
      break;
    case 'highToLow':
      val = '-_id';
      break;
    case 'lowToHigh_Exp':
      val = 'experienceOrder';
      break;
    case 'highToLow_Exp':
      val = '-experienceOrder';
      break;
    default:
  }
  url = val ? `&sort=${encodeURIComponent(val)}` : '';
  return url;
};

export const columnSortUrl = sort => {
  const { column, sortDirection } = sort;
  let url = '';
  const sortValue = sortDirection === 'desc' ? '-' : '';
  url = `&sort=${sortValue}${column}`;
  if (column === 'referral' || column === 'referrer') {
    url = `&sort=${sortValue}${column}.firstName,${column}.lastName`;
  }
  return url;
};

export const skillsUrl = skillsArray => {
  let skills = '';
  skills += skillsArray.length > 0 ? skillsArray.map(selected => `${selected.value}`) : '';
  return skills ? `&skills=${encodeURIComponent(skills)}` : '';
};

export const searchUrl = search => (search ? `&q=${search}` : '');

export const textItemRender = (current, type, element) => {
  if (type === 'prev') {
    return 'Previous';
  }
  if (type === 'next') {
    return 'Next';
  }
  return element;
};

export const loadingListing = () => (
  <React.Fragment>
    <CardSkeleton cardCount={4} />
    <CardSkeleton cardCount={4} />
    <CardSkeleton cardCount={4} />
  </React.Fragment>
);
