/* eslint-disable react/destructuring-assignment */
/** Ambassadors Page
 * This is the Ambassadors page for admin, at the '/admin/ambassadors' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
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
import { A } from 'components/A';
import { ToastifyMessage, Card, PrivateGrid, H3, Badge } from 'components';
import { getBadgeClass } from 'containers/App/utils';
import { TableSkeletonCol6 } from 'components/SkeletonLoader';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { API_URL, VERSION2, AMBASSADOR, LIST, customStyles, ADMIN } from 'containers/App/constants';
import { textItemRender } from 'containers/TalentListingPage/utils';
import SearchComponent from 'components/SearchComponent';
import { localeInfo } from 'containers/TalentListingPage/constants';
import { SelectBox } from 'containers/Admin/Projects/styles';
import { propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import * as actions from './actions';
import saga from './saga';
import { key, columns, DEFAULT_PAGE_NO, ambassadorActionStatusArray } from './constants';
import messages from './messages';
import 'rc-pagination/assets/index.css';

export class Ambassadors extends React.Component {
  constructor(props) {
    super(props);
    const search = StorageService.get('adminAmbassadorSearch') || '';
    this.state = {
      ambassadorList: [],
      paginationData: [],
      isListLoading: false,
      pageNum: DEFAULT_PAGE_NO,
      search,
      statusFilter: { label: 'All', value: -1 },
      totalDocs: 0,
    };
  }

  componentDidMount() {
    const getPageNumber = StorageService.get('ambassadorsPageNumber');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    this.loadAmbassadorDetails(updatedPageNumber);
  }

  loadAmbassadorDetails = pageNum => {
    const { statusFilter } = this.state;
    StorageService.set('ambassadorsPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true });
    const status = get(statusFilter, 'value', -1);
    const { search } = this.state;

    const data = { method: 'GET' };
    let requestURL = '';
    requestURL = `${API_URL}${VERSION2}${AMBASSADOR}${LIST}?page=${pageNum}&q=${search}`;

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
      const temp = response.data.page * response.data.limit - (response.data.limit - 1);
      const filteredAmbassadorActionStatusArray = ambassadorActionStatusArray.filter(obj => obj.value !== -1);
      data.docs.forEach((listData, index) => {
        const status = get(listData, 'status', '');
        const statusVal = ambassadorActionStatusArray.find(obj => obj.label === listData.status).value;
        array.push({
          number: temp + index,
          name: get(listData, 'name', '-'),
          companyName: get(listData, 'companyName', '-'),
          email: get(listData, 'email', '-'),
          status: <Badge className={`${getBadgeClass(status)} badge-sm`}>{status}</Badge>,
          action: (
            <div className="d-flex align-items-center">
              <SelectBox className="input-sm small-arrow me-3">
                <Field
                  name="status"
                  type="text"
                  component={Selects}
                  defaultValue={{ label: listData.status, value: statusVal }}
                  searchable={false}
                  options={filteredAmbassadorActionStatusArray}
                  onChange={e => this.handleChangeStatus(listData.ambassadorUserId, e)}
                />
              </SelectBox>
              {/* eslint-disable-next-line no-underscore-dangle */}
              <A href={`${ADMIN}/ambassador-detail/${listData._id}`}>{containerMessage.btnView.defaultMessage}</A>
            </div>
          ),
        });
      });
      this.setState({ totalDocs, ambassadorList: array, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleChangeStatus = (ambassadorId, selectedVal) => {
    const { onChangeStatus } = this.props;
    const { pageNum } = this.state;
    const data = { ambassadorId, status: selectedVal.value };
    onChangeStatus(data);
    this.loadAmbassadorDetails(pageNum);
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleSearchChange = value => {
    StorageService.set('adminAmbassadorSearch', value);
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
    const LinearIndeterminate = () => (
      <div className="w-100 flex-column d-flex">
        <TableSkeletonCol6 cardCount={5} />
      </div>
    );

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
                      options={ambassadorActionStatusArray.map(item => ({
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
                columns={columns}
                customStyles={customStyles}
                data={ambassadorList}
                totalRows={0}
                direction="ltr"
                progressPending={isListLoading}
                progressComponent={<LinearIndeterminate />}
                paginationComponentOptions={{ noRowsPerPage: true }}
                overflowY
                overflowYOffset="110px"
                noDataComponent={<p className="p-4 m-0 text-muted">{containerMessage.noRecord.defaultMessage}</p>}
              />
            </Card>
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
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

Ambassadors.propTypes = propTypes;
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
)(Ambassadors);
