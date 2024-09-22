/** AmbassadorDetailPage **/
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import isEmpty from 'lodash/isEmpty';
import { VALIDATION } from 'utils/constants';
import { API_URL, VERSION2, ADMIN, AMBASSADOR, logoPlaceholder } from 'containers/App/constants';
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

export class AmbassadorDetailPage extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const ambassadorId = get(params, 'ambassadorId', '');
    this.state = {
      ambassadorId,
      ambassadorData: {},
    };
  }

  componentDidMount() {
    this.loadAdminAmbassadorDetails();
  }

  loadAdminAmbassadorDetails = () => {
    const data = { method: 'GET' };
    const { ambassadorId } = this.state;
    const requestURL = `${API_URL}${VERSION2}${AMBASSADOR}/${ambassadorId}`;
    request(requestURL, data)
      .then(this.setAdminAmbassadorDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setAdminAmbassadorDetails = response => {
    if (get(response, 'status')) {
      const { data } = response;
      this.setState({ ambassadorData: data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderCompanyLogo = ambassadorData => {
    const logoUrl = get(ambassadorData, 'billing.companyDetails.logo');
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

  renderCompanyDetails = ambassadorData => (
    <>
      <Seperator />
      {this.renderCompanyLogo(ambassadorData)}
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
            {get(ambassadorData, 'billing.companyDetails.name', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{messages.brandName.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyDetails.brand', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col classNae="col-4">
          <P className="p16">{containerMessage.labelCompanyRegistrationNo.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyDetails.registeredNumber', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelVatNo.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyDetails.vatNumber', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelWebsite.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyDetails.website', '') ? (
              <A href={get(ambassadorData, 'billing.companyDetails.website', '')} target="_blank">
                {get(ambassadorData, 'billing.companyDetails.website', '')}
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
            {get(ambassadorData, 'billing.companyDetails.linkedInUrl', '') ? (
              <A href={get(ambassadorData, 'billing.companyDetails.linkedInUrl', '')} target="_blank">
                {get(ambassadorData, 'billing.companyDetails.linkedInUrl', '')}
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
            {get(ambassadorData, 'biling.companyLocation.addressLineOne', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelLine2.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyLocation.addressLineTwo', '') || '-'}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelPostcode.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyLocation.postcode', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelCity.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyLocation.city', '-')}
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
            {get(ambassadorData, 'billing.companyLocation.state', '-')}
          </P>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4">
          <P className="p16">{containerMessage.labelCountry.defaultMessage}</P>
        </Col>
        <Col className="col-md-8">
          <P className="p16" opacityVal="0.5">
            {get(ambassadorData, 'billing.companyLocation.country', '-')}
          </P>
        </Col>
      </Row>
    </>
  );

  showProxyLoginCTA = ambassadorData => {
    let output = '';
    if (!isEmpty(ambassadorData) && get(ambassadorData, 'status') !== 'Suspend') {
      output = (
        <div className="mx-auto mt-3 mt-sm-0 me-sm-0">
          <ProxyLogin type="ambassador" userId={get(ambassadorData, 'ambassadorUserId')} {...this.props} />
        </div>
      );
    }
    return output;
  };

  render() {
    const { ambassadorData } = this.state;
    const { history } = this.props;
    return (
      <>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <Content>
          <PrivateGrid>
            <BackLink onClick={() => redirectTo(history, `${ADMIN}/ambassadors`)}>{messages.backToAmbassador.defaultMessage}</BackLink>
            <Card>
              <CardHeader className="flex-column flex-sm-row align-items-start align-items-md-center">
                <div className="d-flex align-items-start">
                  <H3 className="m-0">{messages.titleAmbassadorDetails.defaultMessage}</H3>
                  <Badge className={`${getBadgeClass(get(ambassadorData, 'status'))} ms-3 text-capitalize`}>
                    {get(ambassadorData, 'status')}
                  </Badge>
                </div>
                {this.showProxyLoginCTA(ambassadorData)}
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
                      {get(ambassadorData, 'firstName', '-')}
                    </P>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-4">
                    <P className="p16">{containerMessage.labelLastName.defaultMessage}</P>
                  </Col>
                  <Col className="col-md-8">
                    <P className="p16" opacityVal="0.5">
                      {get(ambassadorData, 'lastName', '-')}
                    </P>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-4">
                    <P className="p16">{containerMessage.labelJobTitle.defaultMessage}</P>
                  </Col>
                  <Col className="col-md-8">
                    <P className="p16" opacityVal="0.5">
                      {get(ambassadorData, 'jobTitle', '-')}
                    </P>
                  </Col>
                </Row>
                {get(ambassadorData, 'registerType') === 'company' ? this.renderCompanyDetails(ambassadorData) : ''}
              </CardBody>
            </Card>
          </PrivateGrid>
        </Content>
      </>
    );
  }
}

AmbassadorDetailPage.propTypes = propTypes;

export default AmbassadorDetailPage;
