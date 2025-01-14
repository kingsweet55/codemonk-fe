/** RecruiterBriefs
 * This is the Projects page for the Client, at the '/client/job-briefs' route
 */
import React from 'react';
import { toast } from 'react-toastify';
import { Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import Content from 'components/Content';
import { PrivateGrid, P, H3, Badge, ToastifyMessage, H6 } from 'components';
import StorageService from 'utils/StorageService';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { API_URL, VERSION2, RECRUITER, JOB_POST, LIST } from 'containers/App/constants';
import JobCard from 'components/JobCard';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import { paginationComponent } from 'containers/App/utils';
import containerMessage from 'containers/messages';
import { defaultSortUrl } from 'containers/TalentListingPage/utils';
import { DEFAULT_PAGE_SIZE } from 'containers/constants';
import { propTypes, defaultProps } from 'containers/proptypes';
import { sortFilterArray } from 'containers/TalentListingPage/constants';
import SearchComponent from 'components/SearchComponent';
import SortComponent from 'components/SortComponent';
import ClientBriefFilters from 'containers/Client/Briefs/ClientBriefFilters';
import NewBriefFilters from 'containers/Client/Briefs/NewBriefFilters';
import { SortSection } from 'containers/Talent/MyProjects/styles';
import { isNoFilterApplied, showNoRecordFound } from 'containers/Client/Briefs/utils';
import messages from './messages';

export class RecruiterBriefs extends React.Component {
  constructor(props) {
    super(props);
    const getPageNumber = StorageService.get('RecruiterBriefPage');
    const RecruiterBriefFilter = StorageService.get('RecruiterBriefFilter');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    const storedFilter = JSON.parse(RecruiterBriefFilter) || {};
    const updatedFilter = isEmpty(storedFilter)
      ? {
          teamPrefArray: [],
          workPrefArray: [],
          showFiltArray: ['active'],
          assignmentsArray: [],
          expertiseArray: [],
          roleArray: [],
          skillsArray: [],
        }
      : storedFilter;
    const noFilterApplied = isNoFilterApplied(updatedFilter).value;
    const BriefSort = StorageService.get('adminBriefSort');
    this.state = {
      noFilterApplied,
      pageNum: updatedPageNumber,
      briefData: [],
      filters: updatedFilter,
      search: '',
      totalCount: 0,
      currentSort: BriefSort ? sortFilterArray.find(item => BriefSort.indexOf(item.value) > -1) : sortFilterArray[0],
    };
  }

  componentDidMount() {
    const { pageNum } = this.state;
    this.loadRecruiterBrief(pageNum);
  }

  loadRecruiterBrief = pageNum => {
    const { search } = this.state;
    StorageService.set('RecruiterBriefPage', JSON.stringify(pageNum));
    this.setState({ isListLoading: true, pageNum });
    const {
      currentSort,
      filters,
      filters: { teamPrefArray, workPrefArray, assignmentsArray, expertiseArray, roleArray, skillsArray, showFiltArray },
    } = this.state;

    // getting filters
    let teamPreference = '';
    let workPreference = '';
    let assignments = '';

    // new
    let expertise = '';
    let role = '';
    let skills = '';
    let status = '';

    teamPreference += get(filters, 'teamPrefArray', []).length > 0 ? teamPrefArray.map(selected => `${selected}`) : '';
    workPreference += get(filters, 'workPrefArray', []).length > 0 ? workPrefArray.map(selected => `${selected}`) : '';
    assignments += get(filters, 'assignmentsArray', []).length > 0 ? assignmentsArray.map(selected => `${selected}`) : '';

    // new filters
    expertise += get(filters, 'expertiseArray', []).length > 0 ? expertiseArray.map(selected => `${selected}`) : '';
    role += get(filters, 'roleArray', []).length > 0 ? roleArray.map(selected => `${selected}`) : '';
    skills += get(filters, 'skillsArray', []).length > 0 ? skillsArray.map(selected => `${selected.value}`) : '';
    status += get(filters, 'showFiltArray', []).length > 0 ? showFiltArray.map(selected => `${selected}`) : '';

    const data = { method: 'GET' };
    let requestURL = `${API_URL}${VERSION2}${RECRUITER}${JOB_POST}${LIST}?page=${pageNum}&limit=${DEFAULT_PAGE_SIZE}${defaultSortUrl(
      currentSort.value,
    )}`;

    requestURL += teamPreference ? `&teamPreference=${teamPreference}` : '';
    requestURL += workPreference ? `&workPreference=${workPreference}` : '';
    requestURL += assignments ? `&assignments=${assignments}` : '';

    // new
    requestURL += expertise ? `&expertise=${encodeURIComponent(expertise)}` : '';
    requestURL += role ? `&role=${encodeURIComponent(role)}` : '';
    requestURL += skills ? `&skills=${encodeURIComponent(skills)}` : '';
    requestURL += status ? `&status=${encodeURIComponent(status)}` : '';

    // search
    requestURL += search ? `&q=${encodeURIComponent(search)}` : '';

    request(requestURL, data)
      .then(this.setRecruiterBriefs)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setRecruiterBriefs = response => {
    if (get(response, 'status')) {
      const { docs } = response.data;
      this.setState({
        paginationData: get(response, 'data', {}),
        briefData: docs,
        isListLoading: false,
        totalCount: response.data.totalDocs,
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleBriefArchived = () => {
    const { pageNum } = this.state;
    this.setState(() => this.loadRecruiterBrief(pageNum));
  };

  briefCard = () => {
    const { briefData, pageNum } = this.state;
    return (
      <JobCard
        jobList={briefData}
        {...this.props}
        loadJobBriefs={() => this.loadTalentBrief(pageNum)}
        handleBriefArchived={this.handleBriefArchived}
        userRole="talent-partner"
      />
    );
  };

  renderBriefCards = () => {
    const { isListLoading, paginationData, search, noFilterApplied } = this.state;
    let output = '';

    if (isListLoading) {
      output = (
        <BriefCardSkeleton
          cardCount={
            get(paginationData, 'totalDocs') > get(paginationData, 'limit')
              ? get(paginationData, 'limit')
              : get(paginationData, 'totalDocs')
          }
        />
      );
    } else {
      const totalDocs = get(paginationData, 'totalDocs');
      if (totalDocs === 0) {
        output = showNoRecordFound(search, noFilterApplied, 'client');
      } else if (totalDocs > get(paginationData, 'limit')) {
        output = (
          <React.Fragment>
            {this.briefCard()}
            {paginationComponent(paginationData, get(paginationData, 'limit'), this.loadRecruiterBrief)}
          </React.Fragment>
        );
      } else {
        output = <React.Fragment>{this.briefCard()}</React.Fragment>;
      }
    }
    return output;
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleSearchChange = value => {
    this.setState({ search: value }, () => {
      this.loadRecruiterBrief(1);
    });
  };

  handleFilterChanged = (filters, noFilterApplied) => {
    this.setState(
      {
        filters,
        noFilterApplied,
      },
      () => {
        this.loadRecruiterBrief(1);
      },
    );
  };

  handleSort = e => {
    StorageService.set('adminBriefSort', JSON.stringify(e.value));
    this.setState({ currentSort: e }, () => {
      this.loadRecruiterBrief(1);
    });
  };

  handleSortChange = selectedSort => {
    this.handleSort(selectedSort);
  };

  render() {
    const { totalCount, currentSort } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <Row>
              <Col lg={12}>
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center me-3">
                    <H3>{messages.heading.defaultMessage}</H3>
                    {totalCount !== 0 && (
                      <Badge className="ms-1 primary badge-sm">
                        <P className="p14 mb-0" lineHeight="16">
                          {totalCount}
                        </P>
                      </Badge>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <SearchComponent handleSearchChange={this.debounceFn} placeholder={containerMessage.searchPlaceholder.defaultMessage} />
                    <ClientBriefFilters {...this.props} handleFilterChanged={this.handleFilterChanged} />
                    <SortSection className="ms-3">
                      <div className="sort-label">
                        <H6 lineHeight="21">{containerMessage.sortBy.defaultMessage}:</H6>
                      </div>
                      <SortComponent
                        sortArray={sortFilterArray}
                        showSortIcon
                        currentSort={currentSort}
                        handleSortChange={this.handleSortChange}
                      />
                    </SortSection>
                  </div>
                </div>
              </Col>
              <Col lg={3} className="d-none" />
            </Row>
            <Row>
              <Col lg={12}>{this.renderBriefCards()}</Col>
              <Col lg={3} className="d-none">
                <NewBriefFilters {...this.props} handleFilterChanged={this.handleFilterChanged} />
              </Col>
            </Row>
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

RecruiterBriefs.defaultProps = defaultProps;
RecruiterBriefs.propTypes = propTypes;

export default RecruiterBriefs;
