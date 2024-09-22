import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      InterviewTalentForm: {
        values: {
          clientName: '',
          projectName: '',
          projectSummary: '',
          startDate: '',
          endDate: '',
          status: '',
        },
      },
    },
  };

  it('should return projectName value', () => {
    const expectedResult = state.form.InterviewTalentForm.values.projectName;
    expect(selectors.projectName(state)).toEqual(expectedResult);
  });
  it('should return projectSummary value', () => {
    const expectedResult = state.form.InterviewTalentForm.values.projectSummary;
    expect(selectors.projectSummary(state)).toEqual(expectedResult);
  });
});

describe('Selectors Testing', () => {
  it('Testing makeSelectInterviewSlot', () => {
    const mockState = {
      InterviewTalentForm: {
        interviewSlotArray: '',
      },
    };
    const result = {
      interviewSlotArray: '',
    };
    const sel = selectors.makeSelectInterviewSlot(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
