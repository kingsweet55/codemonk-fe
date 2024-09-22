import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { EditorState } from 'draft-js';
import { ModalActionInterview as MainForm, mapDispatchToProps } from '../index';
import { CHANGE_INTERVIEW_SLOT } from '../constants';
jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  onChangeInterviewSlot: jest.fn(),
  projectSummary: EditorState.createEmpty(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('InterviewTalent Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if the  onChangeInterviewSlot events are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onChangeInterviewSlot([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_INTERVIEW_SLOT,
      data: [],
    });
  });
});
