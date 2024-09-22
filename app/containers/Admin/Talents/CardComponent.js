import React, { useState } from 'react';
import { H5, P, H3, Badge } from 'components';
import {
  userProfileIcon,
  diamondIcon,
  certificationsIcon,
  teamIcon,
  industryIcon,
  timeXZone,
  teamPreferenceArray,
  starTickIcon,
  ADMIN,
  CLIENT,
  HIRING_ACTION_STATUS,
} from 'containers/App/constants';
import ToolTip from 'components/ToolTip';
import profileContainerMessages from 'containers/MyProfilePage/messages';
import containerMessage from 'containers/messages';
import { propTypes } from 'containers/proptypes';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { Dropdown, DropdownItem } from 'reactstrap';
import ModalActionInterview from 'containers/TalentListingPage/ModalActionInterview';
import { getArrayLabels, getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import { UserProfile, UserProfileImg, PreferencesList } from 'containers/MyProfilePage/styles';
import { TalentCard } from 'containers/TalentListingPage/styles';
import { ActionContainer, ActionToggle, ActionMenu } from './styles';

export const CardComponent = ({ talentData, userRole = 'admin', briefTab = false, project = {}, onSubmitAction }) => {
  const [showModal, setShowModal] = useState('');

  const modalData = {
    briefID: get(project, 'briefID', ''),
    talentId: get(talentData, 'talentUserId', ''),
    talentName: get(talentData, 'name', ''),
    projectId: get(project, 'projectId', ''),
    projectName: get(project, 'projectName', ''),
    projectSummary: get(project, 'projectDescription', ''),
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const id = briefTab ? get(talentData, 'talentId', '') : get(talentData, '_id', '');
  const cardLink = userRole === 'admin' ? `${ADMIN}/talent-profile/${id}` : `${CLIENT}/talent-profile/${id}`;

  const handleModalInterview = () => {
    setShowModal('interview');
  };

  const handleModalShorlist = () => {
    const requestObj = {
      method: 'PUT',
      data: {
        talentId: modalData.talentId,
        jobPostId: modalData.briefID,
        status: HIRING_ACTION_STATUS.shortlist,
      },
    };
    onSubmitAction(requestObj);
  };
  const handleModalHire = () => {
    setShowModal('shortlist');
    const requestObj = {
      method: 'PUT',
      data: {
        talentId: modalData.talentId,
        jobPostId: modalData.briefID,
        status: HIRING_ACTION_STATUS.hire,
      },
    };
    onSubmitAction(requestObj);
    setShowModal('hire');
  };
  const handleModalReject = () => {
    setShowModal('shortlist');
    const requestObj = {
      method: 'PUT',
      data: {
        talentId: modalData.talentId,
        jobPostId: modalData.briefID,
        status: HIRING_ACTION_STATUS.reject,
      },
    };
    onSubmitAction(requestObj);
    setShowModal('reject');
  };

  const handleModalClose = () => {
    setShowModal('');
  };

  const cardBtn = () => {
    const btnInterview = (
      <DropdownItem onClick={handleModalInterview}>
        <span>{containerMessage.btnInterview.defaultMessage}</span>{' '}
      </DropdownItem>
    );
    const btnShortlist = (
      <DropdownItem onClick={handleModalShorlist}>
        <span>{containerMessage.btnShortlist.defaultMessage}</span>{' '}
      </DropdownItem>
    );
    const btnHire = (
      <DropdownItem onClick={handleModalHire}>
        <span>{containerMessage.btnHire.defaultMessage}</span>{' '}
      </DropdownItem>
    );
    const btnReject = (
      <DropdownItem onClick={handleModalReject}>
        <span>{containerMessage.btnReject.defaultMessage}</span>{' '}
      </DropdownItem>
    );
    switch (briefTab) {
      case 'application':
        return (
          <>
            {btnInterview} {btnShortlist} {btnHire} {btnReject}
          </>
        );
      case 'interview':
        return (
          <>
            {btnShortlist} {btnHire} {btnReject}
          </>
        );
      case 'shortlisted':
        return (
          <>
            {btnHire} {btnReject}
          </>
        );
      case 'hired':
        return (
          <>
            {btnHire} {btnReject}
          </>
        );
      case 'rejected':
        return (
          <>
            {btnInterview} {btnShortlist} {btnHire}
          </>
        );
      default:
        return '';
    }
  };

  return (
    <div className="position-relative">
      <TalentCard to={cardLink} type="cardComponent" className="card-sm flex-1 d-flex flex-column">
        <div className="d-flex flex-0 justify-content-between align-items-center">
          <UserProfile>
            <UserProfileImg>
              <img
                src={get(talentData, 'profilePicture', '')}
                alt="user profile"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = userProfileIcon;
                }}
              />
            </UserProfileImg>
          </UserProfile>
        </div>
        <div className="d-flex flex-0 mt-3">
          <div className="d-flex justify-content-between w-100 flex-column">
            <H3>
              {get(talentData, 'firstName')} {get(talentData, 'lastName')}
              {get(talentData, 'verifiedProfile', false) && (
                <ToolTip
                  wrapperClass="d-inline-flex ms-1 align-text-top"
                  type="other"
                  otherIcon={starTickIcon}
                  placement="right"
                  content={
                    <ul className="m-0 ps-2">
                      <li className="text-start">{profileContainerMessages.interviewedForSkillsAndExpertise.defineMessages}</li>
                      <li className="text-start">{profileContainerMessages.checkedForEducationAndExperiences.defineMessages}</li>
                      <li className="text-start">{profileContainerMessages.verifiedPhotoIDandAddress.defineMessages}</li>
                    </ul>
                  }
                  tooltipId="verifiedProfileToltip"
                />
              )}
            </H3>

            <P className="p14 mb-0" opacityVal="0.5">
              {get(talentData, 'city')}, {get(talentData, 'country')} | {getTimzoneOffest(timeXZone, 'name', get(talentData, 'timeZone'))} (
              {get(talentData, 'timeZone')})
            </P>
          </div>
        </div>
        <hr />
        <div className="flex-0">
          <P className="p14 mb-2" opacityVal="0.5">
            {get(talentData, 'yearsOfExperience')}
          </P>
          <H5>{get(talentData, 'primaryRole')}</H5>
        </div>
        <hr />
        {get(talentData, 'skills') && get(talentData, 'skills', []).length >= 1 ? (
          <>
            <div className="d-flex flex-wrap flex-0">
              {get(talentData, 'skills', [])
                .slice(0, 4)
                .map(subItem => (
                  <Badge key={subItem.name} className="primary badge-sm me-2 mb-2">
                    {subItem.name}
                  </Badge>
                ))}
              {get(talentData, 'skills', []).length > 4 && (
                <Badge className="primary badge-sm me-2 mb-2">+{get(talentData, 'skills', []).length - 4} Skills</Badge>
              )}
            </div>
            <hr />
          </>
        ) : (
          ''
        )}
        <PreferencesList className="d-flex flex-column flex-1">
          {get(talentData, 'certificateDetails') && get(talentData, 'certificateDetails', []).length >= 1 ? (
            <li>
              <SVG src={certificationsIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {get(talentData, 'certificateDetails', [])
                  .map(obj => obj.name)
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
          {get(talentData, 'industries') && get(talentData, 'industries', []).length >= 1 ? (
            <li>
              <SVG src={industryIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {get(talentData, 'industries', [])
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
          {get(talentData, 'companyCultures') && get(talentData, 'companyCultures', []).length >= 1 ? (
            <li>
              <SVG src={diamondIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {get(talentData, 'companyCultures', [])
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
          {get(talentData, 'teamPreference') && get(talentData, 'teamPreference', []).length >= 1 ? (
            <li>
              <SVG src={teamIcon} />
              <P className="p16 mb-0 text-truncate d-block" opacityVal="0.5">
                {getArrayLabels(get(talentData, 'teamPreference', []), teamPreferenceArray)
                  .map(i => i)
                  .join(', ')}
              </P>
            </li>
          ) : (
            ''
          )}
        </PreferencesList>
        <hr />
        <div className="flex-0">
          <P className="p14 mb-2" opacityVal="0.5">
            Formerly at
          </P>
          <P className="p16 mb-0">{get(talentData, 'formerEmployer', [])}</P>
        </div>
      </TalentCard>
      <ActionContainer>
        <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
          <ActionToggle className="btn btn-sm btn-outline">
            <span>{containerMessage.btnAction.defaultMessage}</span>
          </ActionToggle>
          <ActionMenu right>{cardBtn()}</ActionMenu>
        </Dropdown>
      </ActionContainer>
      {showModal === 'interview' && (
        <ModalActionInterview
          modalData={modalData}
          showModal={showModal === 'interview'}
          handleModalClose={() => handleModalClose()}
          onSubmitAction={onSubmitAction}
        />
      )}
    </div>
  );
};

CardComponent.propTypes = propTypes;

export default CardComponent;
