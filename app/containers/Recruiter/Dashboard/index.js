/*
 * Dashboard
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import SVG from 'react-inlinesvg';
import SVGIcon from 'components/SVGIcon';
import get from 'lodash/get';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { VALIDATION } from 'utils/constants';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import { toast } from 'react-toastify';
import request from 'utils/request';
import containerMessage from 'containers/messages';
import { PrivateGrid, Card, H2, P, H3, Badge, FormLabel, FormControl, Button, ToastifyMessage } from 'components';
import { FormattedMessage } from 'react-intl';
import { recruiterRedirectToPage, getBadgeClass } from 'containers/App/utils';
import {
  talentEmptyIcon,
  copyIcon,
  plusIcon,
  inviteTalentIcon,
  newCustomStylesForGrid,
  API_URL,
  TALENT,
  LIST,
  RECRUITER,
  VERSION2,
  rightAngleIcon,
} from 'containers/App/constants';
import talentMessages from 'containers/Talent/Dashboard/messages';
import { TileCard } from 'containers/ClientHomePage/styles';
import StorageService from 'utils/StorageService';
import ReferEarnModal from 'containers/Talent/ReferEarn/ReferEarnModal';
import Content from 'components/Content';
import { columnSortUrl } from 'containers/TalentListingPage/utils';
import { LinkViewAll } from 'containers/Talent/Dashboard/styles';
import { primaryNew } from 'themes/variables';
import { inviteTalentColumns } from './constants';
import { GetStaredBlock, EmptyTalentBlock, InviteInputBlock } from './styles';
import messages from './messages';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inviteLink: '',
      isListLoading: false,
      invitedTalentList: [],
      sortFilter: { column: '', sortDirection: '' },
    };
  }

  componentDidMount() {
    const { history, location } = this.props;
    this.fetchFieldValues();
    const currentSignupStep = parseInt(StorageService.get('signupStep'), 10);
    recruiterRedirectToPage(history, location.redirection, currentSignupStep, 3);
    this.loadProjectDetails();
  }

  handleSort = (column, sortDirection) => {
    const sortFilter = { column: column.selector, sortDirection };
    this.setState({ sortFilter }, () => {
      this.loadProjectDetails();
    });
  };

  loadProjectDetails = () => {
    const { sortFilter } = this.state;
    this.setState({ isListLoading: true });
    const data = { method: 'GET' };
    let requestURL = `${API_URL}${VERSION2}${RECRUITER}${TALENT}${LIST}?limit=${5}`;
    requestURL += columnSortUrl(sortFilter);
    request(requestURL, data)
      .then(this.setInvitedTalentDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setInvitedTalentDetails = response => {
    if (get(response, 'status')) {
      const data = Object.assign({}, response.data);
      const array = [];
      const totalDocs = get(response, 'data.totalDocs');
      data.docs.forEach(listData => {
        const id = get(listData, '_id');
        const referredOn = get(listData, 'referredOn');
        const status = get(listData, 'status', '');
        const { firstName = '', lastName = '' } = get(listData, 'referee', {});
        array.push({
          id,
          email: get(listData, 'email'),
          name: `${firstName} ${lastName}`,
          referredOn: referredOn ? moment(referredOn).format('DD/MM/YYYY') : '',
          signedUp: get(listData, 'registeredOn', ''),
          vettedOn: get(listData, 'daysOfRefereeActivated', ''),
          hiredOn: get(listData, 'daysOfRefereeHired', ''),
          status: <Badge className={`${getBadgeClass(status)} badge-sm`}>{status}</Badge>,
        });
      });
      this.setState({ totalDocs, invitedTalentList: array, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  fetchFieldValues = () => {
    const recruiterId = StorageService.get('recruiterId');
    if (recruiterId) {
      const currentHost = window.location.host;
      const inviteLink = `https://${currentHost}/talent/referral/${recruiterId}`;
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

  render() {
    const { inviteLink, isListLoading, invitedTalentList, totalDocs } = this.state;
    const referEarnProps = {
      buttonText: containerMessage.invitebyEmail.defaultMessage,
      buttonClass: 'btn-primary btn-plus mt-3 mt-md-0',
      buttonIcon: plusIcon,
      showEmailBlock: true,
      enableCancel: true,
    };

    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={7} />
      </div>
    );

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <PrivateGrid>
            <Card className="p-40 mb-50">
              <div className="d-flex align-items-start flex-column flex-md-row">
                <TileCard className="primary-tile card-lg">
                  <SVG src={inviteTalentIcon} />
                </TileCard>
                <GetStaredBlock className="mt-3 mt-md-0">
                  <H2 className="mb-2">
                    <FormattedMessage {...messages.startedTitle} />
                  </H2>
                  <P className="p16" opacityVal="0.5" lineHeight="22px">
                    <FormattedMessage {...messages.inviteContent} />
                  </P>
                  <div className="d-flex align-items-xl-end flex-xl-row flex-column">
                    <InviteInputBlock className="me-xl-3">
                      <FormLabel>
                        <FormattedMessage {...containerMessage.inviteLinkLabel} />
                      </FormLabel>
                      <FormControl className="no-background" placeholder={inviteLink} type="text" disabled value={inviteLink} />
                    </InviteInputBlock>
                    <div className="d-flex flex-wrap align-items-center mt-3 mt-xl-0">
                      <Button className="btn btn-outline btn-icon text-primary" type="button" onClick={this.copyToclipboard}>
                        <FormattedMessage {...talentMessages.buttonCopyLink} />
                        <SVG src={copyIcon} className="ms-2" />
                      </Button>
                      <P className="p16 mb-0 mx-3" opacityVal="0.5">
                        <FormattedMessage {...talentMessages.textOR} />
                      </P>
                      <ReferEarnModal {...referEarnProps} />
                    </div>
                  </div>
                </GetStaredBlock>
              </div>
            </Card>
            <div className="d-flex mb-3 align-items-center justify-content-between">
              <div className="d-flex align-items-center mb-2">
                <H3>
                  <FormattedMessage {...messages.yourTalentsTitle} />
                </H3>
                <Badge className="badge-sm ms-2 primary">{totalDocs}</Badge>
              </div>
              <LinkViewAll
                to={{
                  pathname: '',
                  state: { fromDashboard: true },
                }}
              >
                <span className="me-2">
                  <FormattedMessage {...containerMessage.linkViewAll} />
                </span>
                <SVGIcon src={rightAngleIcon} iconColor={`rgb(${primaryNew})`} />
              </LinkViewAll>
            </div>

            {invitedTalentList.length > 0 ? (
              <Card className="pt-0">
                <DataTable
                  noHeader
                  columns={inviteTalentColumns}
                  customStyles={newCustomStylesForGrid}
                  data={invitedTalentList}
                  totalRows={0}
                  direction="ltr"
                  progressPending={isListLoading}
                  progressComponent={<LinearIndeterminate />}
                  paginationComponentOptions={{ noRowsPerPage: true }}
                  overflowY
                  overflowYOffset="70px"
                  noDataComponent={<p className="p-4 m-0 text-muted">{containerMessage.noRecord.defaultMessage}</p>}
                  sortServer
                  onSort={this.handleSort}
                />
              </Card>
            ) : (
              <Card className="p-40 text-center">
                <EmptyTalentBlock className="my-3">
                  <SVG src={talentEmptyIcon} className="mb-3" />
                  <P className="p20" opacityVal="0.5">
                    <FormattedMessage {...messages.notInvited} />
                  </P>
                  <P className="p16 mb-0" opacityVal="0.5" lineHeight="22px">
                    <FormattedMessage {...messages.notInvitedContent} />
                  </P>
                </EmptyTalentBlock>
              </Card>
            )}
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Dashboard.defaultProps = { history: {}, location: {} };
Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default Dashboard;
