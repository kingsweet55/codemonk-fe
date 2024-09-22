import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, change, untouch } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import ReactModal from 'react-modal';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import SVGIcon from 'components/SVGIcon';
import StorageService from 'utils/StorageService';
import { FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { propTypes } from 'containers/proptypes';
import { P, Button, H3, A, FormLabel, FormControl, ToastifyMessage } from 'components';
import talentMessages from 'containers/Talent/Dashboard/messages';
import { gtm } from 'utils/Helper';
import containerMessage from 'containers/messages';
import { newTabIcon, closeIcon, REFERRAL_TERMS, copyIcon, arrowRightIcon, plusSquareIcon, sendIcon } from 'containers/App/constants';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import reducer from 'containers/Talent/Dashboard/reducer';
import saga from 'containers/Talent/Dashboard/saga';
import * as actions from 'containers/Talent/Dashboard/actions';
import injectReducer from 'utils/injectReducer';
import * as selectors from 'containers/Talent/Dashboard/selectors';
import { makeSelectLoading, makeSelectPopUpSaga } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import { InvitePeople } from 'containers/Talent/Dashboard/InvitePeople';
import { key, MINIMUM_INVITE_ROWS } from 'containers/Talent/Dashboard/constants';
import { primaryNew } from 'themes/variables';
import messages from './messages';
import { ReferModalBody } from './styles';

export class ReferEarnModal extends React.Component {
  constructor(props) {
    super(props);
    const { showEmailBlock = false, inviteLink = '' } = this.props;
    this.state = {
      showReferModal: false,
      showEmailBlock,
      inviteLink,
    };
  }

  componentDidMount() {
    const userType = StorageService.get('userType');
    const currentHost = window.location.host;
    let { inviteLink } = this.state;
    if (userType === '5') {
      const recruiterId = StorageService.get('recruiterId');
      inviteLink = `https://${currentHost}/talent/referral/${recruiterId}`;
    }
    if (userType === '6') {
      const ambassadorId = StorageService.get('ambassadorId');
      inviteLink = `https://${currentHost}/talent/referral/${ambassadorId}`;
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      inviteLink,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { popUpSaga, inviteLink, onSubmitReLoadPage = () => {} } = this.props;
    const { showReferModal } = this.state;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ showReferModal: false });
    }
    if (prevProps.inviteLink !== inviteLink) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        inviteLink,
      });
    }
    if (prevState.showReferModal !== showReferModal && !showReferModal) {
      onSubmitReLoadPage();
    }
  }

  showReferModal = () => {
    const { dispatch, onChangeInvite, inviteMails } = this.props;
    const inviteMailsLength = inviteMails.length <= MINIMUM_INVITE_ROWS ? MINIMUM_INVITE_ROWS : inviteMails.length;
    const newInviteMails = [];
    for (let i = 0; i < inviteMailsLength; i++) {
      dispatch(change(key, `name${i}`, ''));
      dispatch(change(key, `email${i}`, ''));
      dispatch(untouch(key, `name${i}`));
      dispatch(untouch(key, `email${i}`));
      newInviteMails.push({ name: '', email: '' });
    }
    onChangeInvite(newInviteMails);
    this.setState({
      showReferModal: true,
    });
  };

  closeReferModalHandler = () => {
    const { showEmailBlock = false } = this.props;
    this.setState({
      showReferModal: false,
      showEmailBlock,
    });
  };

  copyToclipboard = () => {
    const { inviteLink } = this.state;
    navigator.clipboard.writeText(inviteLink);
    toast.success(<ToastifyMessage message={talentMessages.copiedToClipBoard.defaultMessage} type="success" />, {
      className: 'Toast-success',
    });
  };

  showInviteEmailCotnaienr = () => {
    this.setState({
      showEmailBlock: true,
    });
  };

  onAddPeople = () => {
    const { dispatch, onChangeInvite, inviteMails } = this.props;
    const totalPeople = inviteMails.length;
    const newInvite = [
      {
        name: '',
        email: '',
      },
    ];
    dispatch(change(key, `name${totalPeople + 1}`, newInvite.name));
    dispatch(change(key, `email${totalPeople + 1}`, newInvite.url));
    const newInviteMails = [...inviteMails, ...newInvite];
    onChangeInvite(newInviteMails);
  };

  referInviteBlock = () => {
    const {
      inviteMails,
      responseSuccess,
      responseError,
      loading,
      onSubmitInviteMails,
      handleSubmit,
      invalid,
      enableCancel = false,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <InvitePeople {...this.props} inviteMails={inviteMails} formKey={key} />
        {inviteMails.length < 10 && (
          <Button className="btn-icon text-primary btn-link mt-3" onClick={this.onAddPeople}>
            <SVG className="me-2" src={plusSquareIcon} />
            <FormattedMessage {...talentMessages.buttonAddAnother} />
          </Button>
        )}
        <div className="d-flex justify-content-end mt-4">
          {enableCancel ? (
            <Button
              className="btn btn-link d-flex align-content-right m-3"
              onClick={() => {
                this.setState({
                  showReferModal: false,
                });
              }}
            >
              <FormattedMessage {...containerMessage.btnCancel} />
            </Button>
          ) : (
            <Button
              className="btn btn-link d-flex align-content-right m-3"
              onClick={() => {
                this.setState({
                  showEmailBlock: false,
                });
              }}
            >
              <FormattedMessage {...messages.backTonviteLink} />
            </Button>
          )}
          <Button
            className={`${getBtnClass(loading, responseSuccess, responseError)} align-content-right`}
            type="submit"
            onClick={handleSubmit(e => {
              onSubmitInviteMails(e);
              gtm({
                action: 'Button Click',
                label: 'refer_invite',
                category: 'Talent Portal',
                value: inviteMails.length,
                directGA: true,
              });
            })}
            disabled={invalid || inviteMails.every(invite => isEmpty(invite.email))}
          >
            <FormattedMessage {...talentMessages.buttonInvite} />
            <SVG className="mx-2" src={sendIcon} />
          </Button>
        </div>
      </form>
    );
  };

  getTextContent = props => {
    const { showEmailBlock } = this.state;
    const { inviteEmailModalContent = messages.referModalText, inviteBlockModalContent = messages.referModalText } = props;
    const userType = StorageService.get('userType');
    if (userType === '5' && showEmailBlock) {
      return (
        <React.Fragment>
          <H3 className="modal-title d-flex align-items-center mb10">
            <FormattedMessage {...messages.inviteMailHeadingForRecruiter} />
          </H3>
          <P className="p16" opacityVal="0.5">
            <FormattedMessage {...messages.inviteMailContentForRecruiter} />
          </P>
        </React.Fragment>
      );
    }
    if (userType === '6') {
      return (
        <React.Fragment>
          <H3 className="modal-title d-flex align-items-center mb10">
            <FormattedMessage {...messages.inviteMailHeadingForRecruiter} />
          </H3>
          {showEmailBlock ? (
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...inviteEmailModalContent} />
            </P>
          ) : (
            <P className="p16" opacityVal="0.5">
              <FormattedMessage {...inviteBlockModalContent} />
              (<FormattedMessage {...messages.subjectToOurTerms} />{' '}
              <A href={REFERRAL_TERMS} target="_blank" className="ms-1 me-1 text-decoration-underline">
                <SVG src={newTabIcon} />
              </A>
              ).
            </P>
          )}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <H3 className="modal-title d-flex align-items-center mb10">
          <FormattedMessage {...messages.referModalTitle} />
        </H3>
        <P className="p16" opacityVal="0.5">
          <FormattedMessage {...messages.referModalText} />
          (<FormattedMessage {...messages.subjectToOurTerms} />{' '}
          <A href={REFERRAL_TERMS} target="_blank" className="ms-1 me-1 text-decoration-underline">
            <SVG src={newTabIcon} />
          </A>
          ).
        </P>
      </React.Fragment>
    );
  };

  referAndEarnModal = () => {
    const { showReferModal, showEmailBlock } = this.state;
    const { inviteLink } = this.state;
    return (
      <ReactModal
        isOpen={showReferModal}
        contentLabel="crop"
        className={`modal-dialog ${showEmailBlock ? '' : 'modal-sm'}`}
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-end pb-0">
            <button type="button" className="modal-dismiss" onClick={this.closeReferModalHandler}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <ReferModalBody className="modal-body pt-0 mt-2">
            {this.getTextContent(this.props)}
            {!showEmailBlock ? (
              <div>
                <FormLabel className="mt-3">
                  <FormattedMessage {...containerMessage.inviteLinkLabel} />
                </FormLabel>
                <FormControl
                  className="no-background"
                  placeholder="https://app.codemonk.ai/talent/referral/"
                  type="text"
                  disabled
                  value={inviteLink}
                />
                <FormGroup className="text-center mt-4">
                  <Button className="btn btn-primary mt-1 w-100" type="button" onClick={this.copyToclipboard}>
                    <FormattedMessage {...talentMessages.buttonCopyLink} />
                    <SVG src={copyIcon} className="mx-2" />
                  </Button>
                </FormGroup>
                <FormGroup className="text-center mt-4">
                  <Button className="btn btn-outline paddingY12 h-auto w-100" type="button" onClick={this.showInviteEmailCotnaienr}>
                    <FormattedMessage {...containerMessage.invitebyEmail} />
                    <SVGIcon src={arrowRightIcon} className="mx-2" iconColor={`rgb(${primaryNew})`} />
                  </Button>
                </FormGroup>
              </div>
            ) : (
              this.referInviteBlock()
            )}
          </ReferModalBody>
        </div>
      </ReactModal>
    );
  };

  render() {
    const {
      buttonText = messages.inviteNow.defaultMessage,
      buttonClass = 'btn-outline btn-sm',
      buttonIcon,
      buttonDisabled = false,
    } = this.props;
    return (
      <React.Fragment>
        <Button className={`btn ${buttonClass}`} type="button" onClick={this.showReferModal} disabled={buttonDisabled}>
          {buttonIcon && <SVG className="me-2" src={buttonIcon} />}
          <span>{buttonText}</span>
        </Button>
        {this.referAndEarnModal()}
      </React.Fragment>
    );
  }
}

ReferEarnModal.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  inviteMails: selectors.makeSelectInviteMails(),
  loading: makeSelectLoading(),
  popUpSaga: makeSelectPopUpSaga(),
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  email: selectors.email,
  currency: selectors.currency,
  rate: selectors.rate,
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeInvite: data => dispatch(actions.changeInvite(data)),
    onSubmitInviteMails: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.submitInviteMails());
    },
  };
}
const withConnect = connect(
  mapStateToProp,
  mapDispatchToProp,
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
)(ReferEarnModal);
