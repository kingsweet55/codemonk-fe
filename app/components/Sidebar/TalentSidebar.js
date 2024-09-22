import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink, Nav } from 'reactstrap';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import Emitter from 'utils/emitter';
import StorageService from 'utils/StorageService';
import { userExists, getUserRegisterType } from 'utils/Helper';
import { defaultProps, propTypes } from 'containers/proptypes';
import { Badge } from 'components';
import Logo from 'components/Brand';
import { communityIcon, COMMUNITY_URL, TALENT } from 'containers/App/constants';
import { talentNavPages, agencyNavPages } from './constants';
import { FixedSidebar } from './styles';
import messages from './messages';

export class TalentSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: StorageService.get('hamburgerToggle'),
      isSignIn: userExists(),
      roleType: getUserRegisterType(),
      badgeConfiguration: {},
    };
  }

  componentDidMount() {
    Emitter.on('badgeConfigurationUpdated', badgeConfigurationUpdated => {
      this.setState({ badgeConfiguration: badgeConfigurationUpdated });
    });
    Emitter.on(Emitter.EVENTS.HAMBURGER_TOGGLE, isOpen => {
      this.setState({ isOpen });
    });
  }

  componentWillUnmount() {
    Emitter.off('badgeConfigurationUpdated');
    Emitter.off(Emitter.EVENTS.HAMBURGER_TOGGLE);
  }

  renderAgencySideBar = pathName => (
    <>
      {agencyNavPages.map(navItem => (
        <NavItem key={navItem.title}>
          <NavLink
            to={navItem.pathName}
            className={navItem.paths.some(i => i === pathName) ? 'active' : ''}
            tag={Link}
            title={navItem.title}
          >
            <span className="icon">
              <SVG src={navItem.icon} />
              {this.renderNewBadge(navItem)}
            </span>
            <span className="menu-option">
              {navItem.title}
              {this.renderNewBadge(navItem)}
            </span>
          </NavLink>
        </NavItem>
      ))}
    </>
  );

  renderNewBadge = navItem => {
    const { badgeConfiguration } = this.state;
    return (
      <>
        {navItem.isBadgeConfig ? (
          <>
            {badgeConfiguration[navItem.badgeKey] && (
              <Badge className="success new-badge font-0">{messages.newBadgeText.defaultMessage}</Badge>
            )}
          </>
        ) : (
          ''
        )}
      </>
    );
  };

  renderTalentSideBar = pathName => (
    <>
      <>
        {talentNavPages.map(navItem => (
          <NavItem key={navItem.title}>
            <NavLink
              to={navItem.pathName}
              className={navItem.paths.some(i => i === pathName) ? 'active' : ''}
              tag={Link}
              title={navItem.title}
            >
              <span className="icon">
                <SVG src={navItem.icon} />
                {this.renderNewBadge(navItem)}
              </span>
              <span className="menu-option">
                {navItem.title}
                {this.renderNewBadge(navItem)}
              </span>
            </NavLink>
          </NavItem>
        ))}
      </>
      <NavItem>
        <NavLink
          target="_blank"
          href={COMMUNITY_URL}
          className={`${pathName === `${TALENT}/community` || pathName === `${TALENT}/community/` ? 'active' : ''}`}
          title="Community"
        >
          <span className="icon">
            <SVG src={communityIcon} />
          </span>
          <span className="menu-option">{messages.CommunityMenu.defaultMessage}</span>
        </NavLink>
      </NavItem>
    </>
  );

  render() {
    const { location } = this.props;
    const { roleType, isSignIn, isOpen } = this.state;
    const pathName = get(location, 'pathname');
    return (
      <FixedSidebar className={isOpen ? 'sidebar-open' : 'sidebar-close'}>
        <Logo />
        <Nav>
          {isSignIn && roleType !== 'agency' && this.renderTalentSideBar(pathName)}
          {isSignIn && roleType === 'agency' && this.renderAgencySideBar(pathName)}
        </Nav>
      </FixedSidebar>
    );
  }
}

TalentSidebar.defaultProps = defaultProps;
TalentSidebar.propTypes = propTypes;

export default TalentSidebar;
