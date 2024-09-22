import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import { Card, H2, P, H3, Badge, FormLabel, FormControl, Button } from 'components';
import ReferEarnModal from 'containers/Talent/ReferEarn/ReferEarnModal';
import { talentEmptyIcon, copyIcon, plusIcon, inviteTalentIcon } from 'containers/App/constants';
import talentMessages from 'containers/Talent/Dashboard/messages';
import messages from 'containers/Recruiter/Dashboard/messages';
import referEarnMessages from 'containers/Talent/ReferEarn/messages';
import containerMessage from 'containers/messages';
import { TileCard } from 'containers/ClientHomePage/styles';
import { GetStaredBlock, EmptyTalentBlock, InviteInputBlock } from 'containers/Recruiter/Dashboard/styles';

const ClientInvite = props => {
  const { inviteLink, copyToclipboard } = props;
  const referEarnProps = {
    buttonText: containerMessage.invitebyEmail.defaultMessage,
    buttonClass: 'btn-primary btn-plus mt-3 mt-md-0',
    buttonIcon: plusIcon,
    showEmailBlock: true,
    enableCancel: true,
    buttonDisabled: true,
    inviteBlockModalContent: referEarnMessages.referModalAmbassadorClientText,
    inviteEmailModalContent: referEarnMessages.inviteMailContentForClientTab,
  };

  return (
    <React.Fragment>
      <Card className="p-40 mb-50">
        <div className="d-flex align-items-start flex-column flex-md-row">
          <TileCard className="client-icon card-lg">
            <SVG src={inviteTalentIcon} />
          </TileCard>
          <GetStaredBlock className="mt-3 mt-md-0">
            <H2 className="mb-2">
              <FormattedMessage {...messages.dashboardInviteClientTitle} />
            </H2>
            <P className="p16" opacityVal="0.5" lineHeight="22px">
              <FormattedMessage {...messages.dashboardInviteContent} />
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
      <div className="d-flex mb-3 align-items-center">
        <H3>
          <FormattedMessage {...messages.yourClientsTitle} />
        </H3>
        <Badge className="badge-sm ms-2 primary">0</Badge>
      </div>
      <Card className="p-40 text-center">
        <EmptyTalentBlock className="my-3">
          <SVG src={talentEmptyIcon} className="mb-3" />
          <P className="p20" opacityVal="0.5">
            <FormattedMessage {...messages.notInvited} />
          </P>
          <P className="p16 mb-0" opacityVal="0.5" lineHeight="22px">
            <FormattedMessage {...messages.notInvitedClientContent} />
          </P>
        </EmptyTalentBlock>
      </Card>
    </React.Fragment>
  );
};

ClientInvite.defaultProps = { inviteLink: '', copyToclipboard: () => {} };
ClientInvite.propTypes = {
  inviteLink: PropTypes.string,
  copyToclipboard: PropTypes.func,
};

export default ClientInvite;
