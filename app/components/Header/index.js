import React from 'react';
import Emitter from 'utils/emitter';
import StorageService from 'utils/StorageService';
import TalentHeader from 'components/Header/TalentHeader';
import ClientHeader from 'components/Header/ClientHeader';
import RecruiterHeader from 'components/Header/RecruiterHeader';
import AmbassadorHeader from 'components/Header/AmbassadorHeader';
import { getUserRoleFromURL } from 'utils/Helper';
import PageTitle from './PageTitle';
import { HeaderNav, FixedNavbar, NavbarContainer } from './header-style';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: StorageService.get('hamburgerToggle'),
    };
  }

  componentDidMount() {
    Emitter.on(Emitter.EVENTS.HAMBURGER_TOGGLE, isOpen => {
      this.setState({ isOpen });
    });
  }

  componentWillUnmount() {
    Emitter.off(Emitter.EVENTS.HAMBURGER_TOGGLE);
  }

  renderHeader = currentRole => {
    let output = '';
    if (currentRole === 'talent' || currentRole === 'agency') {
      output = <TalentHeader {...this.props} />;
    }
    if (currentRole === 'client' || currentRole === 'admin') {
      output = <ClientHeader {...this.props} />;
    }
    if (currentRole === 'talent-partner') {
      output = <RecruiterHeader {...this.props} />;
    }
    if (currentRole === 'ambassador') {
      output = <AmbassadorHeader {...this.props} />;
    }
    return output;
  };

  render() {
    const { isOpen } = this.state;
    const currentRole = getUserRoleFromURL();
    return (
      <HeaderNav>
        <FixedNavbar className={isOpen ? 'sidebar-open' : 'sidebar-close'}>
          <NavbarContainer fluid>
            <PageTitle currentRole={currentRole} />
            {this.renderHeader(currentRole)}
          </NavbarContainer>
        </FixedNavbar>
      </HeaderNav>
    );
  }
}

export default Header;
