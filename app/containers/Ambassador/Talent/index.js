/* eslint-disable react/destructuring-assignment */
/** Talents Page
 * This is the Talents page for ambassador, at the '/ambassador/talents' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'redux';
import { FormGroup } from 'reactstrap';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import DataTable from 'react-data-table-component';
import StorageService from 'utils/StorageService';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify';
import Selects from 'components/Selects';
import Content from 'components/Content';
import { ToastifyMessage, Card, PrivateGrid, H3, Badge } from 'components';
import { getBadgeClass } from 'containers/App/utils';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import ReferEarnModal from 'containers/Talent/ReferEarn/ReferEarnModal';
import { localeInfo } from 'containers/TalentListingPage/constants';
import injectSaga from 'utils/injectSaga';
import { API_URL, VERSION2, AMBASSADOR, LIST, customStyles, TALENT, plusIcon } from 'containers/App/constants';
import { textItemRender } from 'containers/TalentListingPage/utils';
import SearchComponent from 'components/SearchComponent';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import referEarnMessages from 'containers/Talent/ReferEarn/messages';
import headerContainerMessage from 'components/Header/messages';
import { inviteTalentColumns } from 'containers/Recruiter/Dashboard/constants';
import * as actions from './actions';
import saga from './saga';
import { key, DEFAULT_PAGE_NO, ambassadorTalentActionStatusArray } from './constants';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Talents extends React.Component {
  constructor(props) {
    super(props);
    const search = StorageService.get('ambassadorTalentsSearch') || '';
    this.state = {
      ambassadorList: [],
      paginationData: [],
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
      search,
      statusFilter: { label: 'All', value: -1 },
    };
  }

  componentDidMount() {
    const getPageNumber = StorageService.get('talentsPageNumber');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.loadAmbassadorDetails(updatedPageNumber);
  }

  loadAmbassadorDetails = pageNum => {
    const { statusFilter } = this.state;
    StorageService.set('talentsPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true });
    const status = get(statusFilter, 'value', -1);
    const { search } = this.state;

    const data = { method: 'GET' };
    let requestURL = '';
    requestURL = `${API_URL}${VERSION2}${AMBASSADOR}${TALENT}${LIST}?page=${pageNum}&q=${search}`;

    // statusFilter
    requestURL += status !== -1 ? `&status=${encodeURIComponent(status)}` : '';

    request(requestURL, data)
      .then(this.setAmbassadorDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAmbassadorDetails = response => {
    if (get(response, 'status')) {
      const data = Object.assign({}, response.data);
      const totalDocs = get(response, 'data.totalDocs');
      const array = [];
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
      this.setState({ totalDocs, ambassadorList: array, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = (ambassadorId, selectedVal) => {
    const { onChangeStatus } = this.props;
    const data = { ambassadorID: ambassadorId, status: selectedVal.value };
    onChangeStatus(data);
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleSearchChange = value => {
    StorageService.set('ambassadorTalentsSearch', value);
    const { pageNum } = this.state;
    this.setState({ search: value });
    this.loadAmbassadorDetails(pageNum);
  };

  handleStatusFilter = e => {
    this.setState({ statusFilter: e }, () => {
      this.loadAmbassadorDetails(DEFAULT_PAGE_NO);
    });
  };

  render() {
    const { pageNum } = this.state;
    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={5} />
      </div>
    );

    const referEarnProps = {
      buttonText: headerContainerMessage.inviteTalents.defaultMessage,
      buttonClass: 'btn btn-sm btn-outline btn-plus',
      buttonIcon: plusIcon,
      enableCancel: true,
      inviteBlockModalContent: referEarnMessages.referModalAmbassadorTalentText,
      inviteEmailModalContent: referEarnMessages.inviteMailContentForRecruiter,
      onSubmitReLoadPage: () => this.loadAmbassadorDetails(pageNum),
    };

    const { search, ambassadorList, paginationData, isListLoading, statusFilter, totalDocs } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <PrivateGrid>
            <div className="d-flex align-items-center mb-3">
              <H3>
                <FormattedMessage {...messages.allPartners} />
              </H3>
              <Badge className="primary badge-sm ms-1 ">{totalDocs}</Badge>
            </div>
            <Card className="p-20">
              <Card className="input-sm d-flex table-header border-0 p-0">
                <ReferEarnModal {...referEarnProps} />
                <div className="d-flex ms-auto align-items-center">
                  <SearchComponent
                    handleSearchChange={this.debounceFn}
                    placeholder={containerMessage.searchPlaceholder.defaultMessage}
                    initialValue={search}
                  />
                  <FormGroup className="mb-3 mb-lg-0 ms-3">
                    <Field
                      name="statusFilter"
                      type="text"
                      component={Selects}
                      defaultValue={statusFilter}
                      searchable={false}
                      options={ambassadorTalentActionStatusArray.map(item => ({
                        label: item.label,
                        value: item.value,
                      }))}
                      onChange={e => this.handleStatusFilter(e)}
                    />
                  </FormGroup>
                </div>
              </Card>
              <DataTable
                noHeader
                columns={inviteTalentColumns}
                customStyles={customStyles}
                data={ambassadorList}
                totalRows={0}
                direction="ltr"
                progressPending={isListLoading}
                progressComponent={<LinearIndeterminate />}
                paginationComponentOptions={{ noRowsPerPage: true }}
                overflowY
                overflowYOffset="70px"
                noDataComponent={<p className="p-4 m-0 text-muted">{containerMessage.noRecord.defaultMessage}</p>}
              />
              {paginationData.totalDocs > 20 ? (
                <Pagination
                  total={paginationData.totalDocs}
                  className="ant-pagination"
                  current={paginationData.page}
                  defaultPageSize={paginationData.limit}
                  onChange={this.loadAmbassadorDetails}
                  itemRender={textItemRender}
                  locale={localeInfo}
                />
              ) : (
                ''
              )}
            </Card>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Talents.propTypes = propTypes;
export function mapDispatchToProps(dispatch) {
  return {
    onChangeStatus: (data, onSuccess) => dispatch(actions.changeStatus(data, onSuccess)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Talents);
