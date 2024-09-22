/*
 * RecruiterJobCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getLabel, getCurrencySymbol } from 'containers/MyProfilePage/components/utils';
import { currencyData, yearsOfExperienceArray } from 'containers/App/constants';
import { P, Button } from 'components';
import SkillsList from './SkillsList';
import JobPreferenceList from './JobPreferenceList';
import { JobPreferenceBlock } from './styles';

function RecruiterJobCard(props) {
  const { jobBriefData = [] } = props;
  return (
    <div className="d-flex justify-content-between flex-column">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <P className="mb-0 p16" opacityVal="0.5">
            {getLabel(get(jobBriefData, 'expertise', ''), yearsOfExperienceArray, 'label')}
          </P>
          <div className="d-flex align-items-center">
            {get(jobBriefData, 'ratePerHour') && (
              <>
                <P className="p16 mb-0 text-primary">
                  {getCurrencySymbol(currencyData, 'code', get(jobBriefData, 'currency'))}
                  {get(jobBriefData, 'ratePerHour')}
                </P>
                <P className="p16 mb-0 no-hover" opacityVal="0.5">
                  /hour
                </P>
              </>
            )}
            <Button type="button" className="ms-3 btn btn-sm btn-outline" disabled>
              <span>Refer Candidates</span>
            </Button>
          </div>
        </div>
        <P className="p20 mt-2">{get(jobBriefData, 'name', '')}</P>
        <SkillsList skills={get(jobBriefData, 'skills')} />
        <JobPreferenceBlock>
          <JobPreferenceList
            workPreference={get(jobBriefData, 'workPreference')}
            duration={get(jobBriefData, 'duration')}
            assignments={get(jobBriefData, 'assignments')}
            teamPreference={get(jobBriefData, 'teamPreference')}
            ratePerHour={get(jobBriefData, 'ratePerHour')}
          />
          {get(jobBriefData, 'jobId') && (
            <P className="p14 mb-0 text-end" opacityVal="0.5">
              Job Id: {get(jobBriefData, 'jobId')}
            </P>
          )}
        </JobPreferenceBlock>
      </div>
    </div>
  );
}

RecruiterJobCard.defaultProps = {
  jobBriefData: [],
};

RecruiterJobCard.propTypes = {
  jobBriefData: PropTypes.array,
};

export default RecruiterJobCard;
