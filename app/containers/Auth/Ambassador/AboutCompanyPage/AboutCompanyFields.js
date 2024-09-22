/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import * as normalize from 'utils/normalize';
import { change, Field, touch } from 'redux-form/immutable';
import { renderField, renderAddressField } from 'utils/Fields';
import * as formValidations from 'utils/formValidations';
import { FormLabel, H4, P } from 'components';
import { setChange } from 'containers/Auth/utils';
import Selects from 'components/Selects';
import { getFieldValidator } from 'components/ClientProfileComponents/fields';
import { getAddressObject } from 'components/UserProfileComponents/utils';
import containerMessage from 'containers/messages';
import { countryData } from 'containers/App/constants';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import componentMessage from 'components/UserProfileComponents/messages';
import messages from './messages';

export class AboutCompanyFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: props.addressLineOne || '',
    };
  }

  handleChange = address => {
    const { onChangeAddressLineOne, form, dispatch } = this.props;
    this.setState({ address });
    if (onChangeAddressLineOne) {
      onChangeAddressLineOne({ target: { name: 'addressLineOne', value: address } });
    }
    dispatch(change(form, 'addressLineOne', address));
  };

  handleSelect = (address, placeId) => {
    const {
      form,
      dispatch,
      onChangeCity,
      onChangeAddressLineOne,
      onChangePostcode,
      onChangeAddressLineTwo,
      onChangeCountry,
      onChangeState,
    } = this.props;
    geocodeByPlaceId(placeId)
      .then(results => {
        const addObj = getAddressObject(results[0], address);
        this.setState({ address: addObj.addressLineOne });

        setChange(dispatch, form, addObj);
        dispatch(change(form, 'country', { label: addObj.country, value: addObj.country }));

        if (onChangeAddressLineOne) {
          onChangeAddressLineOne({ target: { name: 'addressLineOne', value: addObj.addressLineOne } });
          onChangeAddressLineTwo({ target: { name: 'addressLineTwo', value: addObj.addressLineTwo } });
          onChangeCity({ target: { name: 'city', value: addObj.city } });
          onChangePostcode({ target: { name: 'postcode', value: addObj.postcode } });
          onChangeCountry({ label: addObj.country, value: addObj.country });
          onChangeState({ target: { name: 'state', value: addObj.state } });
        }
      })
      .catch();
  };

  render() {
    const {
      name,
      brand,
      registeredNumber,
      vatNumber,
      postcode,
      linkedInUrl,
      websiteUrl,
      country,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      dispatch,
      form,
      onChangeName,
      onChangeBrand,
      onChangeVatNumber,
      onChangeRegisteredNumber,
      onChangeAddressLineOne,
      onChangeAddressLineTwo,
      onChangeCity,
      onChangeCountry,
      onChangeLinkedinURL,
      onChangePostcode,
      onChangeState,
      onChangeWebsiteURL,
    } = this.props;
    return (
      <>
        <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
          <FormattedMessage {...containerMessage.titleCompanyDetails} />
        </H4>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCompanyName} />
              </FormLabel>
              <Field
                name="name"
                component={renderField}
                type="text"
                defaultValue={name}
                placeholder={containerMessage.placeHolderCompanyName.defaultMessage}
                onChange={onChangeName}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelBrandName} />
              </FormLabel>
              <Field
                name="brand"
                component={renderField}
                type="text"
                defaultValue={brand}
                placeholder={messages.labelBrandName.defaultMessage}
                onChange={onChangeBrand}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelRegNo} />
              </FormLabel>
              <Field
                name="registeredNumber"
                component={renderField}
                type="text"
                defaultValue={registeredNumber}
                placeholder="e.g. 12345678"
                onChange={onChangeRegisteredNumber}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelVatTaxNumber} />
                <P className="p14 mb-0 ms-1 d-inline text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field
                name="vatNumber"
                component={renderField}
                type="text"
                defaultValue={vatNumber}
                placeholder={messages.placeholderVatTaxNumber.defaultMessage}
                onChange={onChangeVatNumber}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelWeb} />
              </FormLabel>
              <Field
                name="websiteUrl"
                type="text"
                component={renderField}
                value={websiteUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeWebsiteURL}
                validate={getFieldValidator('websiteUrl', true)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProfileLinkedIn} />
              </FormLabel>
              <Field
                name="linkedInUrl"
                type="text"
                component={renderField}
                value={linkedInUrl}
                placeholder={containerMessage.urlPlaceholder.defaultMessage}
                normalize={normalize.trimSpace}
                onChange={onChangeLinkedinURL}
                validate={getFieldValidator('linkedInUrl', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <H4 className="newH4 mt-5 mb-3 d-inline-flex align-items-center" opacityVal="0.5">
          <FormattedMessage {...containerMessage.titleCompanyAddress} />
        </H4>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine1} />
              </FormLabel>
              <Field
                name="addressLineOne"
                type="text"
                component={renderAddressField}
                value={addressLineOne}
                handleChange={add => {
                  dispatch(touch(form, 'addressLineOne'));
                  this.handleChange(add);
                }}
                handleSelect={(add, placeID) => this.handleSelect(add, placeID)}
                placeholder="House no., apartment, building, block"
                onChange={onChangeAddressLineOne}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelLine2} />
                <P className="p14 mb-0 ms-1 d-inline text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field name="addressLineTwo" type="text" component={renderField} value={addressLineTwo} onChange={onChangeAddressLineTwo} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCity} />
              </FormLabel>
              <Field
                name="city"
                type="text"
                component={renderField}
                placeholder={componentMessage.placeHolderCity.defaultMessage}
                value={city}
                onChange={onChangeCity}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelState} />
                <P className="p14 mb-0 ms-1 d-inline text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </FormLabel>
              <Field name="state" type="text" component={renderField} value={state} onChange={onChangeState} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCountry} />
              </FormLabel>
              <Field
                name="country"
                component={Selects}
                defaultValue={country}
                options={countryData.map(c => ({
                  label: c.name,
                  value: c.name,
                }))}
                onChange={onChangeCountry}
                placeHolder={componentMessage.placeHolderSelectCountry.defaultMessage}
                validate={[formValidations.requiredSelect, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelZipCode} />
              </FormLabel>
              <Field
                name="postcode"
                type="text"
                component={renderField}
                placeholder="Pincode"
                value={postcode}
                onChange={onChangePostcode}
                validate={[formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

AboutCompanyFields.defaultProps = {
  name: '',
  brand: '',
  registeredNumber: '',
  vatNumber: '',
  linkedInUrl: '',
  websiteUrl: '',
  country: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  state: '',
  postcode: '',
  form: '',
  onChangeName: () => {},
  onChangeBrand: () => {},
  onChangeVatNumber: () => {},
  onChangeRegisteredNumber: () => {},
  onChangeAddressLineOne: () => {},
  onChangeAddressLineTwo: () => {},
  onChangeCity: () => {},
  onChangeCountry: () => {},
  onChangeLinkedinURL: () => {},
  onChangePostcode: () => {},
  onChangeState: () => {},
  onChangeWebsiteURL: () => {},
  dispatch: () => {},
  image: '',
};
AboutCompanyFields.propTypes = {
  name: PropTypes.string,
  brand: PropTypes.string,
  registeredNumber: PropTypes.string,
  linkedInUrl: PropTypes.string,
  vatNumber: PropTypes.string,
  websiteUrl: PropTypes.string,
  country: PropTypes.any,
  addressLineOne: PropTypes.string,
  addressLineTwo: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postcode: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeBrand: PropTypes.func,
  onChangeVatNumber: PropTypes.func,
  onChangeRegisteredNumber: PropTypes.func,
  onChangeAddressLineOne: PropTypes.func,
  onChangeAddressLineTwo: PropTypes.func,
  onChangeCity: PropTypes.func,
  onChangeCountry: PropTypes.func,
  onChangeLinkedinURL: PropTypes.func,
  onChangePostcode: PropTypes.func,
  onChangeState: PropTypes.func,
  onChangeWebsiteURL: PropTypes.func,
  image: PropTypes.string,
  form: PropTypes.string,
  dispatch: PropTypes.func,
};
