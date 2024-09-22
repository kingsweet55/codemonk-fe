import React from 'react';
import PropTypes from 'prop-types';
import { userExists } from 'utils/Helper';
import get from 'lodash/get';
import { H1 } from 'components';
import Emitter from 'utils/emitter';
import Logo from 'components/Brand';
import StorageService from 'utils/StorageService';
import TalentLogo from 'components/Brand/TalentLogo';
import history from 'utils/history';
import { routes } from 'containers/App/constants';
import { HamburgerToggle } from './header-style';

export class PageTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: StorageService.get('hamburgerToggle') || false,
    };
  }

  setConstructor = () => {
    const stateData = {
      isSignIn: userExists(),
    };
    this.setState({ ...stateData });
  };

  componentDidMount() {
    this.setConstructor();
  }

  menuToggle = () => {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      () => {
        const { isOpen } = this.state;
        StorageService.set('hamburgerToggle', isOpen);
        Emitter.emit(Emitter.EVENTS.HAMBURGER_TOGGLE, isOpen);
      },
    );
  };

  getFormattedPath = pathName => {
    let output = '';
    output = pathName.split('/', 3).join('/');
    return output;
  };

  getPageTitle = () => {
    let output = '';
    const pathName = get(history.location, 'pathname');
    const formattedPath = this.getFormattedPath(pathName);
    output = routes.find(obj => obj.paths.find(i => this.getFormattedPath(i.path) === formattedPath));
    return output ? output.headerTitle : '';
  };

  render() {
    const { isSignIn } = this.state;
    const { currentRole } = this.props;

    return (
      <div className="d-flex align-items-center navbar-expand-md">
        {currentRole === 'talent' || currentRole === 'agency' ? <TalentLogo /> : <Logo />}
        {isSignIn && <HamburgerToggle onClick={this.menuToggle} />}
        <H1 className="mb-0">{this.getPageTitle()}</H1>
      </div>
    );
  }
}

PageTitle.defaultProps = {
  currentRole: 'admin',
};

PageTitle.propTypes = {
  currentRole: PropTypes.string,
};

export default PageTitle;
