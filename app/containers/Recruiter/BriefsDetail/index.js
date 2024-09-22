/** RecruiterBriefDetail
 * This is the Projects page for the Client, at the '/talent-partner/brief-detail' route
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { Row, Col } from 'reactstrap';
import parse from 'html-react-parser';
import SVG from 'react-inlinesvg';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { BriefCardSkeleton } from 'components/SkeletonLoader';
import {
  TALENT_PARTNER,
  API_URL,
  JOB_POST,
  VERSION2,
  RECRUITER,
  backIcon,
  yearsOfExperienceArray,
  currencyData,
  teamPreferenceArray,
} from 'containers/App/constants';
import Content from 'components/Content';
import { PrivateGrid, P, H3, ToastifyMessage, Button } from 'components';
import { redirectBack } from 'containers/App/utils';
import { DBcontainer, LeftCol, RightCol } from 'containers/Talent/Dashboard/styles';
import CandidateCard from 'components/CandidateCard';
import { getLabel, getCurrencySymbol, getArrayLabels } from 'containers/MyProfilePage/components/utils';
import JobPreferenceList from 'components/JobCard/JobPreferenceList';
import { JobCardBlock } from 'components/JobCard/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import messages from './messages';

export class RecruiterBriefDetail extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = props;
    const briefID = get(params, 'briefID', '');
    this.state = {
      briefID,
      isListLoading: false,
    };
  }

  componentDidMount() {
    this.loadBriefData();
  }

  loadBriefData = () => {
    const { briefID } = this.state;
    const data = { method: 'GET' };
    this.setState({ isListLoading: true });
    const requestURL = `${API_URL}${VERSION2}${RECRUITER}${JOB_POST}/${briefID}`;

    request(requestURL, data)
      .then(this.setBriefData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setBriefData = response => {
    if (get(response, 'status')) {
      const { data } = response;
      const id = get(data, '_id');

      const softSkills = get(data, 'softSkills', []);
      const certifications = get(data, 'certifications', []);
      const languages = get(data, 'languages', []);
      const workPreference = get(data, 'workPreference', []);
      const teamPrefArray = getArrayLabels(get(data, 'teamPreference', []), teamPreferenceArray);
      const teamPreference = get(data, 'teamPreference', []);
      const assignments = get(data, 'assignments', []);
      const expertise = getLabel(get(data, 'expertise', ''), yearsOfExperienceArray, 'label');
      const duration = get(data, 'duration', '');
      let ratePerHour = '';
      if (get(data, 'currency')) {
        const currencySymbol = getCurrencySymbol(currencyData, 'code', get(data, 'currency'));
        ratePerHour = `${currencySymbol || ''}${get(data, 'ratePerHour')}`;
      }
      const briefData = {
        id,
        name: get(data, 'name', ''),
        role: get(data, 'role', ''),
        description: get(data, 'description', ''),
        projectDescription: get(data, 'projectDescription', ''),
        isArchived: get(data, 'isArchived'),
        skills: get(data, 'skills', []),
        projectId: get(data, 'projectId', []),
        workPreference,
        teamPreference,
        teamPrefArray,
        assignments,
        expertise,
        duration,
        ratePerHour,
        softSkills,
        certifications,
        languages,
        industry: get(data, 'industry', ''),
        teamWorking: get(data, 'teamWorking', ''),
        discProfile: get(data, 'discProfile', ''),
        timeZone: get(data, 'timeZone', ''),
      };
      this.setState({
        briefAllData: data,
        briefData,
        isListLoading: false,
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderBackLink = () => {
    const { history } = this.props;
    return (
      <Row>
        <Col lg={9} className="d-flex align-items-center mb-3">
          <Button type="button" onClick={() => redirectBack(history, `${TALENT_PARTNER}/job-briefs`)} className="btn-link">
            <SVG src={backIcon} />
          </Button>
          <H3 className="ms-3">
            <FormattedMessage {...messages.jobDetails} />
          </H3>
        </Col>
        <Col lg={3} />
      </Row>
    );
  };

  recruiterJobCard = () => {
    const { briefData, briefAllData } = this.state;
    const skills = [];
    get(briefAllData, 'skills', []).forEach(skill => skills.push({ label: skill, value: skill }));

    return (
      <JobCardBlock className="no-hover">
        <div className="d-flex justify-content-between flex-column">
          <div>
            <div className="d-flex justify-content-between">
              <P className="mb-0 p16" opacityVal="0.5">
                {get(briefData, 'expertise')}
              </P>
              <div className="d-flex align-items-center">
                {get(briefData, 'ratePerHour') && (
                  <div className="d-flex">
                    <P className="p16 mb-0 text-primary">
                      {getCurrencySymbol(currencyData, 'code', get(briefData, 'currency'))}
                      {get(briefData, 'ratePerHour')}
                    </P>
                    <P className="p16 mb-0 no-hover" opacityVal="0.5">
                      /hour
                    </P>
                  </div>
                )}
                <Button type="button" className="btn btn-outline btn-sm ms-3" disabled>
                  Refer Candidates
                </Button>
              </div>
            </div>
            <P className="p20 mt-2">{get(briefData, 'name', '')}</P>
            <JobPreferenceList
              workPreference={get(briefData, 'workPreference')}
              duration={get(briefData, 'duration')}
              assignments={get(briefData, 'assignments')}
              teamPreference={get(briefData, 'teamPreference')}
              ratePerHour={get(briefData, 'ratePerHour')}
            />
            <hr className="my-4" />
            <div className="pt-1">
              <P className="p16">
                <FormattedMessage {...messages.jobDescription} />
              </P>
              <P className="p16" opacityVal="0.5">
                {get(briefData, 'description') && parse(get(briefData, 'description'))}
              </P>
            </div>
          </div>
        </div>
      </JobCardBlock>
    );
  };

  render() {
    const { briefData, isListLoading, briefAllData } = this.state;
    const skills = [];
    get(briefAllData, 'skills', []).forEach(skill => skills.push({ label: skill, value: skill }));
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            {this.renderBackLink()}
            {isListLoading ? (
              <BriefCardSkeleton />
            ) : (
              <DBcontainer>
                <LeftCol>{this.recruiterJobCard()}</LeftCol>
                <RightCol className="mt-0 order-2">
                  <CandidateCard briefData={briefData} />
                </RightCol>
              </DBcontainer>
            )}
          </PrivateGrid>
        </Content>
      </React.Fragment>
    );
  }
}

RecruiterBriefDetail.defaultProps = defaultProps;
RecruiterBriefDetail.propTypes = propTypes;

export default RecruiterBriefDetail;
