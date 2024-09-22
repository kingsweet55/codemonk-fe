/** TalentPartnersDetailPage **/
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import { API_URL, VERSION2, RECRUITER, ADMIN, logoPlaceholder } from 'containers/App/constants';
import { CardHeader, CardBody, BackLink } from 'containers/MyProfilePage/styles';
import Content from 'components/Content';
import request from 'utils/request';
import { propTypes } from 'containers/proptypes';
import { PrivateGrid, Card, H3, Badge, A, P } from 'components';
import ToastifyMessage from 'components/ToastifyMessage';
import { getBadgeClass, redirectTo } from 'containers/App/utils';
import ProxyLogin from 'containers/Admin/ProxyLogin';
import containerMessage from 'containers/messages';
import componentMessage from 'components/UserProfileComponents/messages';
import { LogoBlock } from 'containers/Admin/AgencyDetailPage/styles';
import { Seperator } from 'containers/Admin/ClientDetailPage/styles';
import messages from './messages';

export class TalentPartnersDetailPage extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const recruiterId = get(params, 'recruiterId', '');
    this.state = {
      recruiterId,
      recruiterData: {},
    };
  }

  componentDidMount() {
    this.loadAdminRecruiterDetails();
  }

  loadAdminRecruiterDetails = () => {
    const data = { method: 'GET' };
    const { recruiterId } = this.state;
    const requestURL = `${API_URL}${VERSION2}${RECRUITER}/${recruiterId}`;
    request(requestURL, data)
      .then(this.setAdminRecruiterDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAdminRecruiterDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      this.setState({ recruiterData: data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderCompanyLogo = recruiterData => {
    const logoUrl = get(recruiterData, 'billing.companyDetails.logo');
    const companyLogo = logoUrl ? <img src={logoUrl} alt="logo" /> : <SVG src={logoPlaceholder} />;
    return (
      <>
        <P className="p20">{messages.titleLogo.defaultMessage}</P>
        <Row>
          <Col className="col-md-4">
            <P className="p16">{messages.labelCompanyLogo.defaultMessage}</P>
          </Col>
          <Col className="col-md-8">
            <LogoBlock>{companyLogo}</LogoBlock>
          </Col>
        </Row>
      </>
    );
  };

  renderCompanyDetails = recruiterData => (
    <>
      <Seperator />
      {this.renderCompanyLogo(recruiterData)}
      <Seperator />
      <P className="p20">
        <FormattedMessage {...containerMessage.titleCompanyDetails} />
      </P>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelCompanyName.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyDetails.name', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{messages.brandName.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyDetails.brand', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col classNae="col-4">
          <P className="p16">{containerMessage.labelCompanyRegistrationNo.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyDetails.registeredNumber', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelVatNo.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyDetails.vatNumber', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelWebsite.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyDetails.website', '') ? (
              <A href={get(recruiterData, 'billing.companyDetails.website', '')} target="_blank">
                {get(recruiterData, 'billing.companyDetails.website', '')}
              </A>
            ) : (
              '-'
            )}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">
            <FormattedMessage {...containerMessage.labelProfileLinkedIn} />
          </P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyDetails.linkedInUrl', '') ? (
              <A href={get(recruiterData, 'billing.companyDetails.linkedInUrl', '')} target="_blank">
                {get(recruiterData, 'billing.companyDetails.linkedInUrl', '')}
              </A>
            ) : (
              '-'
            )}
          </P>
        </Col>
      </Row>

      <Seperator />
      <P className="p20">
        <FormattedMessage {...containerMessage.titleCompanyRegisteredAddress} />
      </P>

      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelLine1.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'biling.companyLocation.addressLineOne', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelLine2.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyLocation.addressLineTwo', '') || '-'}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelPostcode.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyLocation.postcode', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelCity.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyLocation.city', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">
            <FormattedMessage {...componentMessage.labelState} />
          </P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyLocation.state', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelCountry.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(recruiterData, 'billing.companyLocation.country', '-')}
          </P>
        </Col>
      </Row>
    </>
  );

  showProxyLoginCTA = recruiterData => {
    let output = '';
    if (!isEmpty(recruiterData) && get(recruiterData, 'status') !== 'Suspend') {
      output = (
        <div className="mx-auto mt-3 mt-sm-0 me-sm-0">
          <ProxyLogin type="talent-partner" userId={get(recruiterData, 'recruiterUserId')} {...this.props} />
        </div>
      );
    }
    return output;
  };

  render() {
    const { recruiterData } = this.state;
    const { history } = this.props;
    return (
      <>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, `${ADMIN}/talent-partners`)}>{messages.backToRecruiter.defaultMessage}</BackLink>
            <Card>
              <CardHeader className="flex-column flex-sm-row align-items-start align-items-md-center">
                <div className="d-flex align-items-start">
                  <H3 className="m-0">{messages.titleRecruiterDetails.defaultMessage}</H3>
                  <Badge className={`${getBadgeClass(get(recruiterData, 'status'))} ms-3 text-capitalize`}>
                    {get(recruiterData, 'status')}
                  </Badge>
                </div>
                {this.showProxyLoginCTA(recruiterData)}
              </CardHeader>
              <CardBody>
                <P className="p20">
                  <FormattedMessage {...messages.titleBasic} />
                </P>
                <Row>
                  <Col className="col-md-4">
                    <P className="p16">{containerMessage.labelFirstName.defaultMessage}</P>
                  </Col>
                  <Col className="col-md-8">
                    <P className="p16" opacityVal="0.5">
                      {get(recruiterData, 'firstName', '-')}
                    </P>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-4">
                    <P className="p16">{containerMessage.labelLastName.defaultMessage}</P>
                  </Col>
                  <Col className="col-md-8">
                    <P className="p16" opacityVal="0.5">
                      {get(recruiterData, 'lastName', '-')}
                    </P>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-4">
                    <P className="p16">{containerMessage.labelJobTitle.defaultMessage}</P>
                  </Col>
                  <Col className="col-md-8">
                    <P className="p16" opacityVal="0.5">
                      {get(recruiterData, 'jobTitle', '-')}
                    </P>
                  </Col>
                </Row>
                {get(recruiterData, 'registerType') === 'company' ? this.renderCompanyDetails(recruiterData) : ''}
              </CardBody>
            </Card>
          </PrivateGrid>
        </Content>
      </>
    );
  }
}

TalentPartnersDetailPage.propTypes = propTypes;

export default TalentPartnersDetailPage;
