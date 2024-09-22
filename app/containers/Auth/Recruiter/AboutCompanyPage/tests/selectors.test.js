import {
  makeSelectName,
  makeSelectBrand,
  makeSelectRegisteredNumber,
  makeSelectVatNumber,
  makeSelectAddressLineOne,
  makeSelectAddressLineTwo,
  makeSelectCity,
  makeSelectCountry,
  makeSelectLinkedInUrl,
  makeSelectPostcode,
  makeSelectState,
  makeSelectWebsiteUrl,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectName', () => {
    const mockState = {
      aboutCompanyForm: {
        name: '',
      },
    };
    const result = {
      name: '',
    };
    const sel = makeSelectName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectBrand', () => {
    const mockState = {
      aboutCompanyForm: {
        brand: '',
      },
    };
    const result = {
      brand: '',
    };
    const sel = makeSelectBrand(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectRegisteredNumber', () => {
    const mockState = {
      aboutCompanyForm: {
        registeredNumber: '',
      },
    };
    const result = {
      registeredNumber: '',
    };
    const sel = makeSelectRegisteredNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectVatNumber', () => {
    const mockState = {
      aboutCompanyForm: {
        vatNumber: '',
      },
    };
    const result = {
      vatNumber: '',
    };
    const sel = makeSelectVatNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPostcode', () => {
    const mockState = {
      aboutCompanyForm: {
        postcode: '',
      },
    };
    const result = {
      postcode: '',
    };
    const sel = makeSelectPostcode(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectLinkedInUrl', () => {
    const mockState = {
      aboutCompanyForm: {
        linkedInUrl: '',
      },
    };
    const result = {
      linkedInUrl: '',
    };
    const sel = makeSelectLinkedInUrl(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectWebsiteUrl', () => {
    const mockState = {
      aboutCompanyForm: {
        websiteUrl: '',
      },
    };
    const result = {
      websiteUrl: '',
    };
    const sel = makeSelectWebsiteUrl(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCountry', () => {
    const mockState = {
      aboutCompanyForm: {
        country: '',
      },
    };
    const result = {
      country: '',
    };
    const sel = makeSelectCountry(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectAddressLineOne', () => {
    const mockState = {
      aboutCompanyForm: {
        addressLineOne: '',
      },
    };
    const result = {
      addressLineOne: '',
    };
    const sel = makeSelectAddressLineOne(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectAddressLineTwo', () => {
    const mockState = {
      aboutCompanyForm: {
        addressLineTwo: '',
      },
    };
    const result = {
      addressLineTwo: '',
    };
    const sel = makeSelectAddressLineTwo(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCity', () => {
    const mockState = {
      aboutCompanyForm: {
        city: '',
      },
    };
    const result = {
      city: '',
    };
    const sel = makeSelectCity(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectState', () => {
    const mockState = {
      aboutCompanyForm: {
        state: '',
      },
    };
    const result = {
      state: '',
    };
    const sel = makeSelectState(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
