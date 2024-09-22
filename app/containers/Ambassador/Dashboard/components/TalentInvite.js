import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import SVGIcon from 'components/SVGIcon';
import get from 'lodash/get';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import { VALIDATION } from 'utils/constants';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import { FormattedMessage } from 'react-intl';
import { getBadgeClass } from 'containers/App/utils';
import request from 'utils/request';
import { Card, H2, P, H3, Badge, FormLabel, FormControl, Button, ToastifyMessage } from 'components';
import ReferEarnModal from 'containers/Talent/ReferEarn/ReferEarnModal';
import { toast } from 'react-toastify';
import {
  talentEmptyIcon,
  copyIcon,
  plusIcon,
  inviteTalentIcon,
  rightAngleIcon,
  newCustomStylesForGrid,
  API_URL,
  VERSION2,
  AMBASSADOR,
  TALENT,
  LIST,
} from 'containers/App/constants';
import { inviteTalentColumns } from 'containers/Recruiter/Dashboard/constants';
import { columnSortUrl } from 'containers/TalentListingPage/utils';
import { primaryNew } from 'themes/variables';
import { LinkViewAll } from 'containers/Talent/Dashboard/styles';
import talentMessages from 'containers/Talent/Dashboard/messages';
import referEarnMessages from 'containers/Talent/ReferEarn/messages';
import messages from 'containers/Recruiter/Dashboard/messages';
import containerMessage from 'containers/messages';
import { TileCard } from 'containers/ClientHomePage/styles';
import { GetStaredBlock, EmptyTalentBlock, InviteInputBlock } from 'containers/Recruiter/Dashboard/styles';

class TalentInvite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isListLoading: false,
      invitedTalentList: [],
      sortFilter: { column: '', sortDirection: '' },
    };
  }

  componentDidMount() {
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
    let requestURL = `${API_URL}${VERSION2}${AMBASSADOR}${TALENT}${LIST}?limit=${5}`;
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
        const { firstName = '', lastName = '' } = get(listData, 'referre', {});
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

  render() {
    const { inviteLink, copyToclipboard } = this.props;
    const { invitedTalentList, totalDocs, isListLoading } = this.state;

    const referEarnProps = {
      buttonText: containerMessage.invitebyEmail.defaultMessage,
      buttonClass: 'btn-primary btn-plus mt-3 mt-md-0',
      buttonIcon: plusIcon,
      showEmailBlock: true,
      enableCancel: true,
      inviteBlockModalContent: referEarnMessages.referModalAmbassadorTalentText,
      inviteEmailModalContent: referEarnMessages.inviteMailContentForRecruiter,
      onSubmitReLoadPage: () => this.loadProjectDetails(),
    };

    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={2} />
      </div>
    );

    return (
      <React.Fragment>
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
                  <Button className="btn btn-outline btn-icon text-primary" type="button" onClick={copyToclipboard}>
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
            <Badge className="badge-sm ms-2 primary">{totalDocs || 0}</Badge>
          </div>
          {totalDocs ? (
            <LinkViewAll
              to={{
                pathname: '' /* `${AMBASSADOR}/talents` */,
                state: { fromDashboard: true },
              }}
            >
              <span className="me-2">
                <FormattedMessage {...containerMessage.linkViewAll} />
              </span>
              <SVGIcon src={rightAngleIcon} iconColor={`rgb(${primaryNew})`} />
            </LinkViewAll>
          ) : (
            ''
          )}
        </div>
        {isListLoading || invitedTalentList.length > 0 ? (
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
      </React.Fragment>
    );
  }
}

TalentInvite.defaultProps = { inviteLink: '', copyToclipboard: () => {} };
TalentInvite.propTypes = {
  inviteLink: PropTypes.string,
  copyToclipboard: PropTypes.func,
};

export default TalentInvite;
