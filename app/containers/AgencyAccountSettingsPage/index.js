/** AgencyAccountSettingsPage
 * This is the AgencyAccountSettingsPage for the App, at the '/agency-account-settings' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { TabContent, TabPane, NavItem } from 'reactstrap';
import { Card } from 'components';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import Content from 'components/Content';
import ToastifyMessage from 'components/ToastifyMessage';
import UpdateEmailIdTab from 'containers/UpdateEmailIdTab';
import UpdatePasswordTab from 'containers/UpdatePasswordTab';
import { loadUserDetails } from 'containers/Auth/utils';
import classnames from 'classnames';
import containerMessage from 'containers/messages';
import { CustomNavTab, NavCard, CustomNavLink } from 'components/CustomTab';
import PayoutTab from './PayoutTab';
import messages from './messages';

export class AgencyAccountSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      activeTab: '1',
    };
  }

  componentDidMount() {
    loadUserDetails(this.setAgencyDetails);
  }

  toggle = tab => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  setAgencyDetails = response => {
    if (get(response, 'status')) {
      this.setState({ list: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  render() {
    const { activeTab, list } = this.state;
    return (
      <>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <Card className="mb-10">
            <NavCard className="tab-sm pb-0 d-flex justify-content-between">
              <CustomNavTab tabs>
                <NavItem>
                  <CustomNavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    <FormattedMessage {...messages.payoutTab} />
                  </CustomNavLink>
                </NavItem>
                <NavItem>
                  <CustomNavLink
                    onClick={() => {
                      this.toggle('2');
                    }}
                    className={classnames({ active: activeTab === '2' })}
                  >
                    <FormattedMessage {...containerMessage.tabEmail} />
                  </CustomNavLink>
                </NavItem>
                <NavItem>
                  <CustomNavLink
                    onClick={() => {
                      this.toggle('3');
                    }}
                    className={classnames({ active: activeTab === '3' })}
                  >
                    <FormattedMessage {...containerMessage.tabPassword} />
                  </CustomNavLink>
                </NavItem>
              </CustomNavTab>
            </NavCard>
            <TabContent activeTab={activeTab}>
              <TabPane className="px-2" tabId="1">
                {!isEmpty(list) && activeTab === '1' && <PayoutTab data={list} />}
              </TabPane>
              <TabPane className="px-2" tabId="2">
                {!isEmpty(list) && activeTab === '2' && <UpdateEmailIdTab data={list} loadUserDetails={loadUserDetails} />}
              </TabPane>
              <TabPane className="px-2" tabId="3">
                {!isEmpty(list) && activeTab === '3' && <UpdatePasswordTab />}
              </TabPane>
            </TabContent>
          </Card>
        </Content>
      </>
    );
  }
}

export default AgencyAccountSettingsPage;
