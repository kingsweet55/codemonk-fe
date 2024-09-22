import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import { propTypes } from 'containers/proptypes';
import { P, Card, H3 } from 'components';
import talentMessages from 'containers/Talent/Dashboard/messages';
import { earnIcon } from 'containers/App/constants';
import reducer from 'containers/Talent/Dashboard/reducer';
import saga from 'containers/Talent/Dashboard/saga';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { key } from 'containers/Talent/Dashboard/constants';
import ReferEarnModal from './ReferEarnModal';
import { ReferEarnCard } from './styles';

const ReferEarn = props => (
  <ReferEarnCard className="mt-5">
    <H3 className="mb-3">
      <FormattedMessage {...talentMessages.referAndEarnTitle} />
    </H3>
    <Card className="bg-secondary-gradient custom-card d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <SVG src={earnIcon} />
        <P className="p16 mb-0 mx-3" lineHeight="18">
          Invite your friends to work on CodeMonk &#38; earn rewards
        </P>
      </div>
      <ReferEarnModal {...props} />
    </Card>
  </ReferEarnCard>
);

ReferEarn.propTypes = propTypes;

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(ReferEarn);
