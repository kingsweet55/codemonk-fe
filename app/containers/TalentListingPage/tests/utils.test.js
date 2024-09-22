import * as functions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  test('for sortUrl with sort recommend', () => {
    const sort = 'recommend';
    const val = 'recommend';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort lastest', () => {
    const sort = 'lastest';
    const val = '-_id';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort oldest', () => {
    const sort = 'oldest';
    const val = '_id';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort seniority', () => {
    const sort = 'seniority';
    const val = 'seniority';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort aToZ', () => {
    const sort = 'aToZ';
    const val = 'name';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort zToA', () => {
    const sort = 'zToA';
    const val = '-name';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort lowToHigh', () => {
    const sort = 'lowToHigh';
    const val = 'experienceOrder';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort highToLow', () => {
    const sort = 'highToLow';
    const val = '-experienceOrder';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort talentHighToLow', () => {
    const sort = 'talentHighToLow';
    const val = 'talents._id';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort talentAToZ', () => {
    const sort = 'talentAToZ';
    const val = 'name';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort talentZToA', () => {
    const sort = 'talentZToA';
    const val = '-name';
    const url = `&sort=${val}`;
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for sortUrl with sort default', () => {
    const sort = '';
    const url = '';
    expect(functions.sortUrl(sort)).toEqual(url);
  });

  test('for skillsUrl with skillsArray not empty', () => {
    const skillsArray = [{ name: 'Android', value: 'Android' }];
    const url = '&skills=Android';
    expect(functions.skillsUrl(skillsArray)).toEqual(url);
  });

  test('for skillsUrl with skillsArray  empty', () => {
    const skillsArray = [];
    const url = '';
    expect(functions.skillsUrl(skillsArray)).toEqual(url);
  });

  test('for searchUrl with search not empty', () => {
    const search = 'Android';
    const url = '&q=Android';
    expect(functions.searchUrl(search)).toEqual(url);
  });

  test('for searchUrl with search  empty', () => {
    const search = '';
    const url = '';
    expect(functions.searchUrl(search)).toEqual(url);
  });

  test('test textItemRender', () => {
    const returnData = functions.textItemRender('test', 'test', 'test');
    const returnData1 = functions.textItemRender('test', 'prev', 'test');
    const returnData2 = functions.textItemRender('test', 'next', 'test');
    expect(returnData).toEqual('test');
    expect(returnData1).toEqual('Previous');
    expect(returnData2).toEqual('Next');
  });

  test('for loadingListing with status 0', () => {
    const loadingListing = jest.spyOn(functions, 'loadingListing');
    loadingListing();
    expect(loadingListing).toHaveBeenCalledTimes(1);
  });
});
