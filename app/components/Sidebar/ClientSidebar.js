import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink, Nav } from 'reactstrap';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import StorageService from 'utils/StorageService';
import { userExists, getUserRegisterType } from 'utils/Helper';
import Emitter from 'utils/emitter';
import { defaultProps, propTypes } from 'containers/proptypes';
import { Badge } from 'components';
import Logo from 'components/Brand';
import { FixedSidebar } from './styles';
import { clientNavPages, adminNavPages } from './constants';
import messages from './messages';

export class ClientSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: StorageService.get('hamburgerToggle'),
      isSignIn: userExists(),
      roleType: getUserRegisterType(),
      badgeConfiguration: {},
    };
  }

  setConstructor = () => {
    const stateData = { isSignIn: userExists(), roleType: getUserRegisterType() };
    this.setState({ ...stateData });
  };

  componentDidMount() {
    this.setConstructor();

    Emitter.on('proxyLoginClient', proxyLoginClient => {
      if (proxyLoginClient) {
        this.setConstructor();
      }
    });

    Emitter.on('proxyBackToAdmin', proxyBackToAdmin => {
      if (proxyBackToAdmin) {
        this.setConstructor();
      }
    });

    Emitter.on('badgeConfigurationUpdated', badgeConfigurationUpdated => {
      this.setState({ badgeConfiguration: badgeConfigurationUpdated });
    });

    Emitter.on(Emitter.EVENTS.HAMBURGER_TOGGLE, isOpen => {
      this.setState({ isOpen });
    });
  }

  componentWillUnmount() {
    Emitter.off('proxyLoginClient');
    Emitter.off('proxyBackToAdmin');
    Emitter.off('badgeConfigurationUpdated');
    Emitter.off(Emitter.EVENTS.HAMBURGER_TOGGLE);
  }

  renderAdminSideBar = pathName => (
    <React.Fragment>
      {adminNavPages.map(navItem => (
        <NavItem key={navItem.title}>
          <NavLink
            to={navItem.pathName}
            className={navItem.paths.some(i => i === pathName) ? 'active' : ''}
            tag={Link}
            title={navItem.title}
          >
            <span className={`${navItem.title === 'Referrals' ? 'referral-icon' : ''} icon`}>
              <SVG src={navItem.icon} />
            </span>
            <span className="menu-option">{navItem.title}</span>
          </NavLink>
        </NavItem>
      ))}
    </React.Fragment>
  );

  renderNewBadge = navItem => {
    const { badgeConfiguration } = this.state;
    return (
      <React.Fragment>
        {navItem.isBadgeConfig ? (
          <>
            {badgeConfiguration[navItem.badgeKey] && (
              <Badge className="success new-badge font-0">{messages.newBadgeText.defaultMessage}</Badge>
            )}
          </>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  };

  render() {
    const { location } = this.props;
    const { roleType, isSignIn, isOpen } = this.state;
    const pathName = get(location, 'pathname');
    return (
      <FixedSidebar className={isOpen ? 'sidebar-open' : 'sidebar-close'}>
        <Logo />
        <Nav>
          {isSignIn && roleType === 'client' && (
            <>
              {clientNavPages.map(navItem => (
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
          )}
          {isSignIn && roleType !== 'client' && this.renderAdminSideBar(pathName)}
        </Nav>
      </FixedSidebar>
    );
  }
}

ClientSidebar.defaultProps = defaultProps;
ClientSidebar.propTypes = propTypes;

export default ClientSidebar;
