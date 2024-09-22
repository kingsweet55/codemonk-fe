/**
 * this is Private pages layout structure.
 * this have a code when user are  ogin into system this layout call else it will automatically
 * redirect to login page
 * @author Innovify
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { userExists, setNextLocation, getUserRoleFromURL, checkCurrectUserPage, dashboardPath, loginPath } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import MainContent from 'components/MainContent';
import Content from 'components/Content';
import Emitter from 'utils/emitter';
import { TALENT_DASHBOARD, AGENCY_DASHBOARD, TALENT } from 'containers/App/constants';
import ClientSidebar from 'components/Sidebar/ClientSidebar';
import TalentSidebar from 'components/Sidebar/TalentSidebar';
import RecruiterSidebar from 'components/Sidebar/RecruiterSidebar';
import AmbassadorSidebar from 'components/Sidebar/AmbassadorSidebar';
import Header from 'components/Header';
import Footer from 'components/Footer/index';
import {
  clientRedirectPageURL,
  agencyRedirectPageURL,
  checkIfHasAccessURL,
  recruiterRedirectPageURL,
  ambassadorRedirectPageURL,
} from 'containers/App/utils';
import useEngagebay from '../../../hooks/useEngagebay';
import useCheckVersion from '../../../hooks/useCheckVersion';
import { PrivateWrapper } from '../styles';

/**
 * Layout is main layout renderer const.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */
export const Layout = props => {
  useEngagebay();
  useCheckVersion();
  const [isOpen, setToggle] = useState(StorageService.get('hamburgerToggle'));

  useEffect(() => {
    Emitter.on(Emitter.EVENTS.HAMBURGER_TOGGLE, isToggleOpen => {
      setToggle(isToggleOpen);
    });
  }, [isOpen]);

  const { children } = props;
  let sidebar = '';
  if (getUserRoleFromURL() === 'talent' || getUserRoleFromURL() === 'agency') {
    sidebar = <TalentSidebar {...props} />;
  } else if (getUserRoleFromURL() === 'client' || getUserRoleFromURL() === 'admin') {
    sidebar = <ClientSidebar {...props} />;
  } else if (getUserRoleFromURL() === 'talent-partner') {
    sidebar = <RecruiterSidebar {...props} />;
  } else if (getUserRoleFromURL() === 'ambassador') {
    sidebar = <AmbassadorSidebar {...props} />;
  }

  return (
    <PrivateWrapper className="private-layout">
      <Header {...props} />
      {sidebar}
      <MainContent className={`${isOpen ? 'sidebar-open' : 'sidebar-close'} with-sidebar`}>
        <Content className="p-0">{children}</Content>
        <Footer />
      </MainContent>
    </PrivateWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

Layout.defaultProps = {
  children: <div>.</div>,
};

Layout.displayName = 'Layout';

/**
 * Redirect to Auth page when user try to hit Private urls.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */
export const Redirects = ({ location }) => {
  setNextLocation(location.pathname);
  let pathname = '';
  if (userExists()) {
    pathname = dashboardPath();
  } else {
    pathname = loginPath();
  }
  return (
    <Redirect
      to={{
        pathname,
        state: { from: location },
        search: location.search,
      }}
    />
  );
};

Redirects.propTypes = {
  location: PropTypes.object,
};

Redirects.defaultProps = {
  location: {},
};
Redirects.displayName = 'Redirects';

const redirectToPage = props => {
  let output = '';
  const userType = parseInt(StorageService.get('userType'), 10);
  if (userExists() && checkCurrectUserPage() && checkIfHasAccessURL(userType)) {
    const signupStep = parseInt(StorageService.get('signupStep'), 10);
    const requestChangeEmail = parseInt(StorageService.get('requestChangeEmail'), 10);
    const { pathname } = props.location;
    if (userType === 1 && requestChangeEmail === 1 && (pathname !== TALENT_DASHBOARD && pathname !== `${TALENT}/account-settings`)) {
      const url = TALENT_DASHBOARD;
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else if (userType === 2 && signupStep < 3) {
      const url = clientRedirectPageURL(signupStep);
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else if (userType === 3 && signupStep < 7 && pathname !== AGENCY_DASHBOARD) {
      const url = agencyRedirectPageURL(signupStep);
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else if (userType === 5 && signupStep < 2) {
      const url = recruiterRedirectPageURL(signupStep);
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else if (userType === 6 && signupStep < 2) {
      const url = ambassadorRedirectPageURL(signupStep);
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else {
      output = (
        <Layout {...props}>
          <Route {...props} />
        </Layout>
      );
    }
  } else {
    output = <Redirects {...props} />;
  }

  return output;
};
/**
 * PrivateLayout is main layout files.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */

const PrivateLayout = props => redirectToPage(props);

PrivateLayout.displayName = 'PrivateLayout';

export default PrivateLayout;
