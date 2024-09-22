import React from 'react';
import { Link } from 'react-router-dom';
import { userExists } from 'utils/Helper';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { Dropdown, DropdownItem } from 'reactstrap';
import { defaultProps, propTypes } from 'containers/proptypes';
import LogoutLink from 'components/LogoutLink';
import { A } from 'components';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import history from 'utils/history';
import {
  userIcon,
  settingIcon,
  logoutIcon,
  backArrowIcon,
  clientsGIcon,
  teamGIcon,
  quotesGIcon,
  TYPEFORM_URL,
  CLIENT,
} from 'containers/App/constants';
import containerMessage from 'containers/messages';
import { redirectTo } from 'containers/App/utils';
import AddProject from 'containers/Admin/Projects/AddProject';
import AddBrief from 'containers/Client/AddBrief';
import { handleBackToAdmin } from 'containers/Admin/ProxyLogin/utils';
import { getSkills } from 'containers/Auth/utils';
import Notifications from 'containers/Notifications';
import Autocomplete from 'containers/TalentListingPage/AutoComplete';
import ToastifyMessage from 'components/ToastifyMessage';
import { UserImg, UserProfileToggle, UserProfileMenu, HeaderActions, SecondaryNav } from './header-style';
import messages from './messages';

const getUsrDetail = () => ({
  isSignupStep: StorageService.get('signupStep') || '',
});

export class ClientHeader extends React.Component {
  constructor(props) {
    super(props);
    const profilePicture = StorageService.get('profilePicture');
    this.state = {
      profilePicture,
      skillsList: [],
      skillsArray: [],
    };
  }

  setConstructor = () => {
    const userType = StorageService.get('userType');
    const proxyType = StorageService.get('proxyType');
    const profilePicture = StorageService.get('profilePicture');
    const stateData = {
      dropdownOpen: false,
      isSignIn: userExists(),
      ...getUsrDetail(),
      userType,
      proxyType,
      badgeConfiguration: {},
      profilePicture,
    };
    this.setState({ ...stateData });
  };

  componentDidMount() {
    this.setConstructor();
    getSkills(this.setSkills);

    Emitter.on('proxyLoginClient', proxyLoginClient => {
      if (proxyLoginClient) {
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

  setSkills = response => {
    if (get(response, 'status')) {
      this.setState({ skillsList: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  componentWillUnmount() {
    Emitter.off('proxyLoginClient');
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

  searchSkillsValueChangedTemp = (data, clearFilter) => {
    const { value } = data;
    const filterObjectGet = StorageService.get('filterObject');
    let filterObject;
    try {
      filterObject = JSON.parse(filterObjectGet) || { skillsArray: [] };
    } catch {
      filterObject = { skillsArray: [] };
    }
    const skillsArray = filterObject.skillsArray || [];
    const newSkillsArray = clearFilter ? skillsArray.filter(i => i.value !== value) : [value].concat(skillsArray);
    this.storeSelectedFilterValue('skillsArray', newSkillsArray.map(val => val));
    this.setReservedFilter(newSkillsArray.map(val => val));
    if (!(history && history.location && history.location.pathname === `${CLIENT}/talent-listing`)) {
      redirectTo(history, `${CLIENT}/talent-listing`);
    }
  };

  setReservedFilter = skillsArray => {
    this.setState({ skillsArray });
  };

  storeSelectedFilterValue = (keyName, KeyValue) => {
    const filterObjectGet = StorageService.get('filterObject');
    const filterObject = JSON.parse(filterObjectGet) || {};
    filterObject[keyName] = KeyValue;
    StorageService.set('filterObject', JSON.stringify(filterObject));
    Emitter.emit('filterObject');
  };

  render() {
    const {
      profilePicture,
      userType,
      isSignIn,
      dropdownOpen,
      isSignupStep,
      proxyType,
      badgeConfiguration,
      skillsList,
      skillsArray,
    } = this.state;
    return (
      <>
        {isSignIn && userType === '2' && (
          <div className="d-flex">
            {isSignupStep >= '3' && (
              <>
                <div className="me-3 me-xl-0">
                  <Autocomplete
                    customClass="skill-search order-lg-0 order-1"
                    options={skillsList.filter(v => skillsArray.filter(i => i.value === v).length === 0)}
                    label=""
                    filterType="skillSearch"
                    placeholder="Search by skills"
                    valueChanged={this.searchSkillsValueChangedTemp}
                  />
                </div>
                <HeaderActions className="d-none d-xl-flex">
                  <AddBrief
                    type="add"
                    btnTitle={containerMessage.createBrief.defaultMessage}
                    btnClassName="top-0 btn btn-sm btn-outline btn-plus"
                    withAddIcon
                    isClientHeader
                  />
                  <AddProject
                    {...this.props}
                    btnTitle={containerMessage.btnNewProject.defaultMessage}
                    btnClassName="ms-3 btn btn-sm btn-plus btn-primary"
                    withAddIcon
                    isClientProject
                    isClientHeader
                  />
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
                  {isSignupStep >= '3' && (
                    <>
                      <DropdownItem tag={Link} to={`${CLIENT}/about-you`}>
                        <SVG src={userIcon} />
                        <FormattedMessage {...messages.menuItemMyProfile} />
                      </DropdownItem>
                      <DropdownItem tag={Link} to={`${CLIENT}/account-settings`}>
                        <SVG src={settingIcon} />
                        <FormattedMessage {...messages.menuItemAccountSetting} />
                      </DropdownItem>
                      <DropdownItem className="d-md-none" tag={Link} to={`${CLIENT}/job-briefs`}>
                        <SVG className="client-icon" src={clientsGIcon} />
                        <FormattedMessage {...messages.menuItemPostBrief} />
                      </DropdownItem>
                      <DropdownItem className="d-md-none" tag={Link} to={`${CLIENT}/talent-listing`}>
                        <SVG className="client-icon" src={clientsGIcon} />
                        <FormattedMessage {...messages.menuItemSearchTalent} />
                      </DropdownItem>
                      <DropdownItem className="d-md-none text-decoration-none" tag={A} target="_blank" href={TYPEFORM_URL}>
                        <SVG src={teamGIcon} />
                        <FormattedMessage {...messages.buttonBuildTeam} />
                      </DropdownItem>
                      <DropdownItem className="d-md-none" tag={Link} to={`${CLIENT}/start-project`}>
                        <SVG src={quotesGIcon} />
                        <FormattedMessage {...messages.menuRequestQuote} />
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

        {/* admin profile dropdown */}
        {isSignIn && userType === '4' && (
          <div className="d-flex">
            <Dropdown isOpen={dropdownOpen} toggle={this.dropdownToggle}>
              <UserProfileToggle>
                <SVG src={userIcon} />
              </UserProfileToggle>
              <UserProfileMenu right>
                <div className="inner-block">
                  <DropdownItem tag={LogoutLink}>
                    <SVG src={logoutIcon} />
                    <FormattedMessage {...messages.menuItemLogout} />
                  </DropdownItem>
                </div>
              </UserProfileMenu>
            </Dropdown>
          </div>
        )}
      </>
    );
  }
}

ClientHeader.defaultProps = defaultProps;
ClientHeader.propTypes = propTypes;

export default ClientHeader;
