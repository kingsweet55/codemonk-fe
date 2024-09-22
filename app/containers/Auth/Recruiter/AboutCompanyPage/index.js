/**
 * AboutCompanyPage
 * This is the onboarding page for the client user, at the '/about-company' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from 'containers/App/actions';
import { reduxForm, change } from 'redux-form/immutable';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import ToastifyMessage from 'components/ToastifyMessage';
import { signupLink } from 'containers/App/utils';
import { P, H1, LinkButtonMod, FormWrapper, Button } from 'components';
import { loadUserDetails, storeApiSignupStep } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import { getPictureDropZone } from 'containers/Auth/PersonalDetails/pictureDropZone';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { VALIDATION } from 'utils/constants';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { AboutCompanyFields } from './AboutCompanyFields';
import messages from './messages';
import { key } from './constants';

export class AboutCompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    loadUserDetails(this.setUserDetails);
  }

  /** onDrop callback
   * @param {*} acceptedFiles is array of accepted files
   * @param {*} rejectedFiles is array of accepted files
   * @author Innovify
   */
  onDrop = (acceptedFiles, rejectedFiles) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFile} type="error" />, { className: 'Toast-error' });
    } else if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      const selectedFile = acceptedFiles[0];
      this.checkFileType(selectedFile, reader);
    }
  };

  checkFileType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(png|jpg|jpeg)$');
    if (regex.test(file.type)) {
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          this.setState({
            image: reader.result,
            selectedFile,
          });
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  deletePhoto = () => {
    this.setState({ image: '' });
  };

  setUserDetails = response => {
    const { history } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      this.setValues(get(response, 'data.billing', {}));
    } else {
      history.push(signupLink);
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setValues = data => {
    const { dispatch } = this.props;
    const { companyDetails, companyLocation } = data;
    const country = get(companyLocation, 'country', '');
    const setData = {
      name: get(companyDetails, 'name', ''),
      brand: get(companyDetails, 'brand', ''),
      registeredNumber: get(companyDetails, 'registeredNumber', ''),
      vatNumber: get(companyDetails, 'vatNumber', ''),
      postcode: get(companyLocation, 'postcode', ''),
      linkedInUrl: get(companyDetails, 'linkedInUrl', ''),
      websiteUrl: get(companyDetails, 'websiteUrl', ''),
      country: { label: country, value: country },
      addressLineOne: get(companyLocation, 'addressLineOne', ''),
      addressLineTwo: get(companyLocation, 'addressLineTwo', ''),
      city: get(companyLocation, 'city', ''),
      state: get(companyLocation, 'state', ''),
    };
    const logoURL = get(companyDetails, 'logo', '');
    this.setState({ image: logoURL ? `${logoURL}?_t=${new Date().getTime()}` : logoURL });
    Object.keys(setData).forEach(fieldKey => {
      dispatch(change(key, fieldKey, setData[fieldKey]));
    });
    dispatch(actions.changeName(setData.name));
    dispatch(actions.changeBrand(setData.brand));
    dispatch(actions.changeRegisteredNumber(setData.registeredNumber));
    dispatch(actions.changeVatNumber(setData.vatNumber));
    dispatch(actions.changeAddressLineOne(setData.addressLineOne));
    dispatch(actions.changeLinkedinURL(setData.linkedInUrl));
    dispatch(actions.changeAddressLineTwo(setData.addressLineTwo));
    dispatch(actions.changeCity(setData.city));
    dispatch(actions.changeCountry(setData.country));
    dispatch(actions.changePostcode(setData.postcode));
    dispatch(actions.changeState(setData.state));
    dispatch(actions.changeWebsiteURL(setData.changeWebsiteURL));
  };

  handleSaveForLater = (e, type) => {
    if (type !== 'continue') {
      e.preventDefault();
    }
    const {
      onSubmitAboutCompanyForm,
      onSaveForLater,
      name,
      brand,
      registeredNumber,
      vatNumber,
      postcode,
      linkedInUrl,
      websiteUrl,
      country,
      addressLineOne,
      addressLineTwo,
      city,
      state,
    } = this.props;
    const { selectedFile, image } = this.state;
    const data = {
      name,
      brand,
      registeredNumber,
      vatNumber,
      postcode,
      linkedInUrl,
      websiteUrl,
      country,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      logo: !selectedFile ? image : selectedFile,
    };
    if (type === 'saveForLater') onSaveForLater(e, data, type);
    else if (type === 'continue') onSubmitAboutCompanyForm(e, data, type);
  };

  render() {
    const { invalid, loading, responseSuccess, responseError, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.aboutYourCompany} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.aboutYourCompanyTagLine} />
          </P>
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col className="col-12 col-xl-4 d-flex align-items-center">
                  <div className="d-inline">
                    <P className="p20 mb-3 m-xl-0 d-inline">
                      <FormattedMessage {...messages.uploadCompanyLogo} />
                    </P>
                    <P className="p14 mb-0 ms-1 d-inline text-capitalize" opacityVal="0.5">
                      <FormattedMessage {...containerMessage.optionalText} />
                    </P>
                  </div>
                </Col>
                <Col className="col-12 col-xl-8">
                  <div id="dropZone">{getPictureDropZone(this, 'logoUploader')}</div>
                </Col>
              </Row>
              <AboutCompanyFields formKey={key} {...this.props} />
              <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end my-5">
                <LinkButtonMod
                  color="link"
                  onClick={e => {
                    this.handleSaveForLater(e, 'saveForLater');
                  }}
                >
                  <FormattedMessage {...messages.saveLaterButton} />
                </LinkButtonMod>
                <Button
                  type="submit"
                  className={`${getBtnClass(loading, responseSuccess, responseError)} mt-3 mt-md-0 ms-md-3`}
                  disabled={invalid}
                  onClick={handleSubmit(e => {
                    this.handleSaveForLater(e, 'continue');
                  })}
                >
                  <FormattedMessage {...containerMessage.continueToDashboardButton} />
                </Button>
              </div>
            </form>
          </FormWrapper>
        </>
      </React.Fragment>
    );
  }
}

AboutCompanyPage.defaultProps = {
  location: {},
  dispatch: () => {},
  history: {},
  invalid: true,
  loading: false,
  responseSuccess: false,
  responseError: false,
  handleSubmit: () => {},
  onSubmitAboutCompanyForm: () => {},
  onSaveForLater: () => {},
  name: '',
  brand: '',
  registeredNumber: '',
  vatNumber: '',
  postcode: '',
  linkedInUrl: '',
  websiteUrl: '',
  country: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  state: '',
};

AboutCompanyPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  location: PropTypes.object,
  onSubmitAboutCompanyForm: PropTypes.func,
  onSaveForLater: PropTypes.func,
  name: PropTypes.string,
  brand: PropTypes.string,
  registeredNumber: PropTypes.string,
  vatNumber: PropTypes.string,
  postcode: PropTypes.string,
  linkedInUrl: PropTypes.string,
  websiteUrl: PropTypes.string,
  country: PropTypes.any,
  addressLineOne: PropTypes.string,
  addressLineTwo: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: evt => dispatch(actions.changeName(evt.target.value)),
    onChangeBrand: evt => dispatch(actions.changeBrand(evt.target.value)),
    onChangeVatNumber: evt => dispatch(actions.changeVatNumber(evt.target.value)),
    onChangeRegisteredNumber: evt => dispatch(actions.changeRegisteredNumber(evt.target.value)),
    onChangeAddressLineOne: evt => dispatch(actions.changeAddressLineOne(evt.target.value)),
    onChangeAddressLineTwo: evt => dispatch(actions.changeAddressLineTwo(evt.target.value)),
    onChangeCity: evt => dispatch(actions.changeCity(evt.target.value)),
    onChangeCountry: evt => dispatch(actions.changeCountry(evt)),
    onChangeLinkedinURL: evt => dispatch(actions.changeLinkedinURL(evt.target.value)),
    onChangePostcode: evt => dispatch(actions.changePostcode(evt.target.value)),
    onChangeState: evt => dispatch(actions.changeState(evt.target.value)),
    onChangeWebsiteURL: evt => dispatch(actions.changeWebsiteURL(evt.target.value)),
    onSaveForLater: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitAboutCompanyForm(type, data));
    },
    onSubmitAboutCompanyForm: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitAboutCompanyForm(type, data));
    },
  };
}
const mapStateToProps = createStructuredSelector({
  name: selectors.makeSelectName(),
  brand: selectors.makeSelectBrand(),
  registeredNumber: selectors.makeSelectRegisteredNumber(),
  vatNumber: selectors.makeSelectVatNumber(),
  postcode: selectors.makeSelectPostcode(),
  linkedInUrl: selectors.makeSelectLinkedInUrl(),
  websiteUrl: selectors.makeSelectWebsiteUrl(),
  country: selectors.makeSelectCountry(),
  addressLineOne: selectors.makeSelectAddressLineOne(),
  addressLineTwo: selectors.makeSelectAddressLineTwo(),
  city: selectors.makeSelectCity(),
  state: selectors.makeSelectState(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(AboutCompanyPage);
