import React from 'react';
import { Link } from 'react-router-dom';
import { userExists } from 'utils/Helper';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { Dropdown, DropdownItem } from 'reactstrap';
import { defaultProps, propTypes } from 'containers/proptypes';
import LogoutLink from 'components/LogoutLink';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { userIcon, settingIcon, logoutIcon, backArrowIcon, TALENT_PARTNER, plusIcon } from 'containers/App/constants';
import ReferEarnModal from 'containers/Talent/ReferEarn/ReferEarnModal';
import { handleBackToAdmin } from 'containers/Admin/ProxyLogin/utils';
import Notifications from 'containers/Notifications';
import { UserImg, UserProfileToggle, UserProfileMenu, HeaderActions, SecondaryNav } from './header-style';
import messages from './messages';

const getUsrDetail = () => ({
  isSignupStep: StorageService.get('signupStep') || '',
});

export class RecruiterHeader extends React.Component {
  constructor(props) {
    super(props);
    const profilePicture = StorageService.get('profilePicture');
    this.state = {
      profilePicture,
    };
  }

  setConstructor = () => {
    const proxyType = StorageService.get('proxyType');
    const profilePicture = StorageService.get('profilePicture');
    const stateData = {
      dropdownOpen: false,
      isSignIn: userExists(),
      ...getUsrDetail(),
      proxyType,
      badgeConfiguration: {},
      profilePicture,
    };
    this.setState({ ...stateData });
  };

  componentDidMount() {
    this.setConstructor();
    Emitter.on(Emitter.EVENTS.Proxy_Login_Recruiter, proxyLoginRecruiter => {
      if (proxyLoginRecruiter) {
        this.setConstructor();
      }
    });
    Emitter.on('profilePicture', profilePicture => {
      let url = '';
      if (profilePicture) {
        url = `${profilePicture}?_t=${new Date().getTime()}`;
      }
      this.setState({
        profilePicture: url,
      });
      StorageService.set('profilePicture', url, { hash: true });
    });
    Emitter.on('proxyBackToAdmin', proxyBackToAdmin => {
      if (proxyBackToAdmin) {
        this.setState({ dropdownOpen: false }, () => {
          this.setConstructor();
        });
      }
    });
    Emitter.on('badgeConfigurationUpdated', badgeConfigurationUpdated => {
      this.setState({ badgeConfiguration: badgeConfigurationUpdated });
    });
  }

  componentWillUnmount() {
    Emitter.off(Emitter.EVENTS.Proxy_Login_Recruiter);
    Emitter.off('proxyBackToAdmin');
    Emitter.off('profilePicture');
    Emitter.off('badgeConfigurationUpdated');
  }

  /**
   * call toggle on tab change
   * @author Innovify
   */
  dropdownToggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const { profilePicture, isSignIn, dropdownOpen, isSignupStep, proxyType, badgeConfiguration } = this.state;
    const referEarnProps = {
      buttonText: messages.inviteTalents.defaultMessage,
      buttonClass: 'btn-sm btn-plus btn-primary',
      buttonIcon: plusIcon,
    };
    return (
      <>
        {isSignIn && (
          <div className="d-flex">
            {isSignupStep >= '2' && (
              <>
                <HeaderActions className="d-none border-start-0 ps-0 d-xl-flex">
                  <ReferEarnModal {...referEarnProps} />
                </HeaderActions>
                <SecondaryNav>
                  <Notifications newNotification={get(badgeConfiguration, 'newNotification')} />
                </SecondaryNav>
              </>
            )}
            <Dropdown isOpen={dropdownOpen} toggle={this.dropdownToggle}>
              <UserProfileToggle>
                {profilePicture ? <UserImg src={profilePicture} alt="user-profile" /> : <SVG src={userIcon} />}
              </UserProfileToggle>
              <UserProfileMenu right>
                <div className="inner-block">
                  {isSignupStep >= '2' && (
                    <>
                      <DropdownItem tag={Link} to={`${TALENT_PARTNER}/about-you`}>
                        <SVG src={userIcon} />
                        <FormattedMessage {...messages.menuItemMyProfile} />
                      </DropdownItem>
                      <DropdownItem className="d-none" tag={Link} to={`${TALENT_PARTNER}/account-settings`}>
                        <SVG src={settingIcon} />
                        <FormattedMessage {...messages.menuItemAccountSetting} />
                      </DropdownItem>
                    </>
                  )}
                  <DropdownItem tag={LogoutLink}>
                    <SVG src={logoutIcon} />
                    <FormattedMessage {...messages.menuItemLogout} />
                  </DropdownItem>
                  {/* proxyLogin Return to admin */}
                  {proxyType && (
                    <DropdownItem onClick={handleBackToAdmin}>
                      <SVG src={backArrowIcon} />
                      <FormattedMessage {...messages.menuItemBackToAdmin} />
                    </DropdownItem>
                  )}
                </div>
              </UserProfileMenu>
            </Dropdown>
          </div>
        )}
      </>
    );
  }
}

RecruiterHeader.defaultProps = defaultProps;
RecruiterHeader.propTypes = propTypes;

export default RecruiterHeader;
