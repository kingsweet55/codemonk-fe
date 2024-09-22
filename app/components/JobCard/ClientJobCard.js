/*
 * ClientJobCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { redirectTo } from 'containers/App/utils';
import StorageService from 'utils/StorageService';
import { getLabel, getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import TeamImgList from 'components/TeamImgList';
import ArchiveBriefModal from 'containers/Client/BriefsDetail/ArchiveBriefModal';
import { arrowRightIcon, circleTickIcon, currencyData, yearsOfExperienceArray, projectPlaceholderXSM } from 'containers/App/constants';
import { P, Button, SVGIcon } from 'components';
import { primaryNew } from 'themes/variables';
import SkillsList from './SkillsList';
import JobPreferenceList from './JobPreferenceList';

function ClientJobCard(props) {
  const { jobBriefData = {}, handleBriefArchived, userRole, history } = props;
  const searchCandidatePath = userRole === 'admin' ? 'talents' : 'talent-listing';
  const yearsOfExperience = getLabel(get(jobBriefData, 'expertise', ''), yearsOfExperienceArray, 'label');
  const teamPreference = get(jobBriefData, 'teamPreference', []);
  const workPreference = get(jobBriefData, 'workPreference', []);
  const assignment = get(jobBriefData, 'assignments', []);
  const skillsArray = [];
  const ratePerHour = get(jobBriefData, 'ratePerHour', '');
  const annualRate = get(jobBriefData, 'annualRate', '');
  const employmentType = get(jobBriefData, 'employmentType', []);
  const applicantData = {
    application: {
      stepItems: get(jobBriefData, 'talentDetails', []),
      caption: 'Applications',
    },
    interviewed: {
      stepItems: get(jobBriefData, 'interviewApplicants', []),
      caption: 'Interviewed',
    },
    shortlisted: {
      stepItems: get(jobBriefData, 'shortlistedApplicants', []),
      caption: 'Shortlisted',
    },
    hired: {
      stepItems: get(jobBriefData, 'hiredApplicants', []),
      caption: 'Hired',
    },
    rejected: {
      stepItems: get(jobBriefData, 'rejectedApplicants', []),
      caption: 'Rejected',
    },
  };

  // eslint-disable-next-line react/prop-types
  const renderApplicantIconsByStep = ({ stepItems = [], caption = '' }) => (
    <>
      {stepItems.length > 0 && (
        <div className="d-flex flex-column me-4">
          <P className="p14 text-primary">
            {caption} <SVGIcon src={arrowRightIcon} iconColor={`rgb(${primaryNew})`} />
          </P>
          <TeamImgList data={stepItems} displayImgCount={4} />
        </div>
      )}
    </>
  );

  const renderRate = (rate, type, unit) => (
    <>
      <P className="p16 mb-0 text-primary">
        {getCurrencySymbol(currencyData, 'code', get(jobBriefData, type))}
        {rate}
      </P>
      <P className="p16 mb-0 no-hover" opacityVal="0.5">
        {unit}
      </P>
    </>
  );
  get(jobBriefData, 'skills').map(v => skillsArray.push({ label: v, value: v }));
  return (
    <>
      <div className="d-flex justify-content-between flex-column">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <SVG src={projectPlaceholderXSM} className="project-placeholder" />
              <P className="p16 text-primary text-decoration-underline mb-0">{get(jobBriefData, 'projectName')}</P>
            </div>

            <div className="d-flex align-items-center">
              {employmentType.length > 0 ? (
                <>
                  {employmentType.includes('freelancer-consultant')
                    ? renderRate(ratePerHour, 'currency', '/hour')
                    : renderRate(annualRate, 'currencyAnnualRate', '/annual')}
                </>
              ) : (
                renderRate(ratePerHour, 'currency', '/hour')
              )}
              <Button
                className="btn btn-outline btn-sm ms-3"
                onClick={e => {
                  e.stopPropagation();
                  let filterObject = {};
                  StorageService.set('filterObject', JSON.stringify(filterObject));
                  filterObject = { yearsOfExperience, teamPreference, workPreference, assignment, skillsArray };
                  StorageService.set('filterObject', JSON.stringify(filterObject));
                  redirectTo(history, `/${userRole}/${searchCandidatePath}`);
                }}
              >
                Search Candidate
              </Button>
              {!get(jobBriefData, 'isArchived') ? (
                <div role="button" tabIndex={0} className="ms-3" onClick={e => e.stopPropagation()} onKeyDown={() => {}}>
                  <ArchiveBriefModal onKeyDown={() => {}} briefID={get(jobBriefData, '_id')} handleBriefArchived={handleBriefArchived} />
                </div>
              ) : (
                <div className="d-flex align-items-center ms-3">
                  <SVG src={circleTickIcon} />
                  <P className="p14 mb-0 text-success ms-2">Archived</P>
                </div>
              )}
            </div>
          </div>
          <P className="mb-0 p16" opacityVal="0.5">
            {yearsOfExperience}
          </P>
          <P className="p20 mt-2">{get(jobBriefData, 'name', '')}</P>
          <SkillsList skills={get(jobBriefData, 'skills')} />
          <JobPreferenceList
            workPreference={workPreference}
            duration={get(jobBriefData, 'duration')}
            assignments={assignment}
            teamPreference={teamPreference}
            ratePerHour={get(jobBriefData, 'ratePerHour')}
          />
        </div>
        {get(jobBriefData, 'jobId') && (
          <>
            <hr className="mt-3 mb-3" />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                {renderApplicantIconsByStep(applicantData.application)}
                {renderApplicantIconsByStep(applicantData.interviewed)}
                {renderApplicantIconsByStep(applicantData.shortlisted)}
                {renderApplicantIconsByStep(applicantData.hired)}
                {renderApplicantIconsByStep(applicantData.rejected)}
              </div>
              {get(jobBriefData, 'jobId') && (
                <P className="p14 mb-0 ms-auto" opacityVal="0.5">
                  Job Id: {get(jobBriefData, 'jobId')}
                </P>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

ClientJobCard.defaultProps = {
  jobBriefData: {},
  handleBriefArchived: () => {},
  userRole: '',
  history: {},
};

ClientJobCard.propTypes = {
  jobBriefData: PropTypes.object,
  handleBriefArchived: PropTypes.func,
  userRole: PropTypes.string,
  history: PropTypes.object,
};

export default ClientJobCard;
