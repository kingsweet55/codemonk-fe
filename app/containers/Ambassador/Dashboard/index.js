/*
 * Dashboard
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem } from 'reactstrap';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import { PrivateGrid, ToastifyMessage } from 'components';
import * as actions from 'containers/Talent/Dashboard/actions';
import injectReducer from 'utils/injectReducer';
import * as selectors from 'containers/Talent/Dashboard/selectors';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Talent/Dashboard/reducer';
import saga from 'containers/Talent/Dashboard/saga';
import { ambassadorRedirectToPage } from 'containers/App/utils';
import talentMessages from 'containers/Talent/Dashboard/messages';
import talentContainerMessages from 'containers/Admin/Talents/messages';
import clientContainerMessages from 'containers/Admin/Clients/messages';
import StorageService from 'utils/StorageService';
import Content from 'components/Content';
import { key } from 'containers/Talent/Dashboard/constants';
import messages from 'containers/Recruiter/Dashboard/messages';
import { CLIENT, TALENT } from 'containers/App/constants';
import TalentInvite from './components/TalentInvite';
import ClientInvite from './components/ClientInvite';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteLink: '',
      activeTab: TALENT,
    };
  }

  componentDidMount() {
    const { history, location } = this.props;
    this.fetchFieldValues();
    const currentSignupStep = parseInt(StorageService.get('signupStep'), 10);
    ambassadorRedirectToPage(history, location.redirection, currentSignupStep, 2);
  }

  fetchFieldValues = () => {
    const ambassadorId = StorageService.get('ambassadorId');
    if (ambassadorId) {
      const currentHost = window.location.host;
      const inviteLink = `https://${currentHost}/talent/referral/${ambassadorId}`;
      this.setState({ inviteLink });
    }
  };

  copyToclipboard = () => {
    const { inviteLink } = this.state;
    navigator.clipboard.writeText(inviteLink);
    toast.success(<ToastifyMessage message={talentMessages.copiedToClipBoard.defaultMessage} type="success" />, {
      className: 'Toast-success',
    });
  };

  toggle = tab => {
    const { activeTab } = this.state;
    const { onChangeReferType } = this.props;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
      onChangeReferType(tab);
    }
  };

  render() {
    const { inviteLink, activeTab } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <PrivateGrid>
            <NavCard className="tab-sm dasboard-tabber pb-0 d-flex justify-content-between">
              <CustomNavTab tabs>
                <NavItem key={TALENT}>
                  <CustomNavLink
                    className={classnames({ active: activeTab === TALENT })}
                    onClick={() => {
                      this.toggle(TALENT);
                    }}
                  >
                    <FormattedMessage {...talentContainerMessages.title} />
                  </CustomNavLink>
                </NavItem>
                <NavItem key={CLIENT}>
                  <CustomNavLink
                    className={classnames({ active: activeTab === CLIENT })}
                    onClick={() => {
                      this.toggle(CLIENT);
                    }}
                  >
                    <FormattedMessage {...clientContainerMessages.title} />
                  </CustomNavLink>
                </NavItem>
              </CustomNavTab>
            </NavCard>
            <TabContent activeTab={activeTab} className="dasboard-tabber-content pt-4">
              <TabPane className="pt-2" tabId={TALENT}>
                {activeTab === TALENT && <TalentInvite inviteLink={inviteLink} copyToclipboard={this.copyToclipboard} />}
              </TabPane>
              <TabPane className="pt-2" tabId={CLIENT}>
                {activeTab === CLIENT && <ClientInvite inviteLink={inviteLink} copyToclipboard={this.copyToclipboard} />}
              </TabPane>
            </TabContent>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Dashboard.defaultProps = { history: {}, location: {}, onChangeReferType: () => {} };
Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  onChangeReferType: PropTypes.func,
};

const mapStateToProp = createStructuredSelector({
  referEarnType: selectors.makeSelectReferEarnType(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeReferType: data => dispatch(actions.referEarnType(data)),
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
)(Dashboard);
