/** ModalActionInterview Page
 * This is the ModalActionInterview in client profile
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import moment from 'moment';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import { FormGroup, Row, Col } from 'reactstrap';
import DatePickers from 'components/DatePickers';
import { FormLabel, H4, Button, ToastifyMessage, P } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import AsyncSelects from 'components/AsyncSelects';
import { API_URL, CLIENT, PROJECT_API, LIST, HIRING_ACTION_STATUS } from 'containers/App/constants';
import { renderTextEditor } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import injectReducer from 'utils/injectReducer';
import { VALIDATION } from 'utils/constants';
import request from 'utils/request';
import { makeSelectLoading } from 'containers/App/selectors';
import containerMessage from 'containers/messages';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { propTypes } from 'containers/proptypes';
import { ResendBtn } from 'containers/ClientAccountSettingsPage/styles';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import { key } from './constants';
import messages from '../messages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const ModalActionInterview = props => {
  const { invalid, loading, showModal, handleModalClose, modalData } = props;

  const { onSubmitAction, projectName, projectSummary, onChangeInterviewSlot, dispatch } = props;

  const initOptionName = {
    label: get(modalData, 'projectName', ''),
    value: get(modalData, 'projectId', ''),
  };
  const initOptionSummary = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML(get(modalData, 'projectSummary', ''))),
  );

  const [projectOptions, setProjectOptions] = useState([initOptionName]);
  const [projectData, setProjectData] = useState([{ description: initOptionSummary }]);

  const fetchProject = async value => {
    const { talentId } = modalData.talentId;
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${LIST}?q=${value}&talentId=${talentId}`;
    return request(requestURL, data);
  };
  const processProjectData = data => {
    const output = [];
    data.forEach(item => {
      const option = {
        label: `${item.name}`,
        // eslint-disable-next-line no-underscore-dangle
        value: item._id,
      };
      output.push(option);
    });
    return output;
  };
  const getOptions = (inputValue, callback) => {
    const clientData = fetchProject(inputValue);
    clientData
      .then(response => {
        const { status, data } = response;
        if (status) {
          setProjectData(data);
          const optionData = processProjectData(data);
          setProjectOptions(optionData);
          callback(optionData);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };
  const debouncedGetOptions = debounce((inputValue, cb) => getOptions(inputValue, cb), 500);
  const loadOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      debouncedGetOptions(inputValue, callback);
    }
  };

  const handleChange = option => {
    const projectId = get(option, 'value', '');
    const index = projectOptions.findIndex(item => item.value === projectId);
    const optionSummary = get(projectData[index], 'description', '');
    const richTextSummary = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(optionSummary)));
    dispatch(change(key, 'projectName', option));
    dispatch(change(key, 'projectSummary', richTextSummary));
  };

  const [interviewArraySlot, setInterviewArraySlot] = useState([]);
  const [interviewArrayMinTimeArray, setInterviewArrayMinTimeArray] = useState([]);

  const addTimeslot = () => {
    if (interviewArraySlot.length < 3) {
      const newInterviewSlotArray = [...interviewArraySlot, moment().toDate()];
      const newInterviewMinTimeArray = [...interviewArrayMinTimeArray, moment().toDate()];

      dispatch(change(key, `timeSlot${interviewArraySlot.length}`, ''));
      setInterviewArraySlot(newInterviewSlotArray);
      setInterviewArrayMinTimeArray(newInterviewMinTimeArray);
      onChangeInterviewSlot(newInterviewSlotArray);
    }
  };
  const removeTimeslot = removeIndex => {
    if (interviewArraySlot.length > 1) {
      let newInterviewSlotArray = jsonCopy(interviewArraySlot);
      newInterviewSlotArray = newInterviewSlotArray.filter((_, index) => index !== removeIndex);

      let newInterviewMinTimeArray = jsonCopy(interviewArrayMinTimeArray);
      newInterviewMinTimeArray = newInterviewMinTimeArray.filter((_, index) => index !== removeIndex);

      setInterviewArraySlot(newInterviewSlotArray);
      setInterviewArrayMinTimeArray(newInterviewMinTimeArray);
      onChangeInterviewSlot(newInterviewSlotArray);

      for (let i = 0; i < newInterviewSlotArray.length; i++) {
        const newDateTime = moment(newInterviewSlotArray[i]).toDate();
        dispatch(change(key, `timeSlot${i}`, newDateTime));
        dispatch(untouch(key, `timeSlot${i}`));
      }

      const total = newInterviewSlotArray.length;
      dispatch(change(key, `timeSlot${total}`, ''));
      dispatch(untouch(key, `timeSlot${total}`));
    }
  };
  const onChangeTimeSlot = (index, date) => {
    const today = moment();
    const selectedDate = moment(date);
    const diffOfDates = selectedDate.startOf('day').diff(today.startOf('day'), 'days');

    const start = diffOfDates === 0 ? moment() : moment(date);
    const remainder = 30 - (start.minute() % 30);

    const dateTime = moment(start)
      .add(remainder, 'minutes')
      .format('DD/MM/YYYY h:mm:ss a');
    const newDate = moment(dateTime, 'DD/MM/YYYY h:mm:ss a').toDate();

    const newInterviewSlotArray = interviewArraySlot;
    newInterviewSlotArray[index] = newDate;
    dispatch(change(key, `timeSlot${index}`, newDate));

    const newInterviewMinTimeArray = interviewArrayMinTimeArray;

    if (diffOfDates === 0) {
      newInterviewMinTimeArray[index] = moment().toDate();
    } else {
      newInterviewMinTimeArray[index] = moment()
        .startOf('day')
        .toDate();
    }

    setInterviewArraySlot(newInterviewSlotArray);
    setInterviewArrayMinTimeArray(newInterviewMinTimeArray);
    onChangeInterviewSlot(newInterviewSlotArray);
  };

  const renderInterviewSlots = () =>
    interviewArraySlot.map((slot, index) => (
      <Row key={`timeSlot${slot}`}>
        <Col md="6">
          <FormGroup className="input-sm">
            <FormLabel>{`Option ${index + 1}`}</FormLabel>
            <Field
              name={`timeSlot${index}`}
              component={DatePickers}
              dateFormat="dd/MM/yyyy h:mm aa"
              showYearDropDown
              showTimeSelect
              placeholder="DD/MM/YYYY HH:MM"
              minDate={new Date()}
              minTime={interviewArrayMinTimeArray[index]}
              maxTime={moment()
                .endOf('day')
                .toDate()}
              selected={slot}
              onChange={date => onChangeTimeSlot(index, date)}
              yearDropdownItemNumber={50}
              scrollableYearDropdown
              shouldCloseOnSelect={false}
              placement="top-end"
              validate={[formValidations.requiredDate]}
            />
            {interviewArraySlot.length > 1 && (
              <ResendBtn className="input-sm" color="link" type="button" onClick={() => removeTimeslot(index)}>
                Delete
              </ResendBtn>
            )}
          </FormGroup>
        </Col>
      </Row>
    ));

  useEffect(() => {
    addTimeslot();

    const data = {
      projectName: { label: '', value: '' },
      projectSummary: EditorState.createEmpty(),
    };
    if (!isEmpty(modalData)) {
      data.projectName = initOptionName;
      data.projectSummary = initOptionSummary;
    }

    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });
    dispatch(change(key, 'timeSlot0', ''));
    dispatch(untouch(key, 'timeSlot0'));
    dispatch(change(key, 'timeSlot1', ''));
    dispatch(untouch(key, 'timeSlot1'));
    dispatch(change(key, 'timeSlot2', ''));
    dispatch(untouch(key, 'timeSlot2'));
    onChangeInterviewSlot([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    handleModalClose();
    const requestObj = {
      method: 'PUT',
      data: {
        talentId: modalData.talentId,
        jobPostId: modalData.briefID,
        status: HIRING_ACTION_STATUS.interview,
        timeSlots: interviewArraySlot,
      },
    };

    onSubmitAction(requestObj);
  };

  return (
    <PopupWrapper
      title={messages.interviewTalentTitle.defaultMessage}
      loading={loading}
      disabled={invalid}
      isOpen={showModal}
      modalType="hire"
      onDiscard={() => handleModalClose()}
      onHandleSubmit={handleSubmit}
    >
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md="12">
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProjectName} />
              </FormLabel>
              <Field
                name="projectName"
                type="text"
                component={AsyncSelects}
                defaultValue={projectName}
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={projectOptions}
                handleChange={handleChange}
                placeHolder={containerMessage.placeholderProjectName.defaultMessage}
                validate={[formValidations.requiredSelect]}
                creatable
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...messages.labelProjectSummary} />
              </FormLabel>
              <Field
                name="projectSummary"
                component={renderTextEditor}
                editorState={projectSummary}
                placeholder={messages.placeholderProjectSummary.defaultMessage}
                validate={[formValidations.minLengthRichText100, formValidations.maxLengthRichText1500]}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="d-inline-flex align-items-center my-3">
          <H4 className="newH4 my-0" opacityVal="0.5">
            {messages.labelInterviewSlot.defaultMessage}
          </H4>
          <P className="p14 mb-0 ms-1 d-inline" opacityVal="0.5">
            {messages.labelInterviewSlotSmall.defaultMessage}
          </P>
        </div>
        {renderInterviewSlots()}
        {interviewArraySlot.length < 3 && (
          <Button className="btn-primary btn-sm btn-link text-decoration-underline" type="button" onClick={() => addTimeslot()}>
            Add another
          </Button>
        )}
      </form>
    </PopupWrapper>
  );
};

ModalActionInterview.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  projectName: selectors.projectName,
  projectSummary: selectors.projectSummary,
  interviewSlotArray: selectors.makeSelectInterviewSlot(),

  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInterviewSlot: data => {
      dispatch(actions.changeInterviewSlot(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key, reducer });

export default compose(
  withReducer,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(ModalActionInterview);
