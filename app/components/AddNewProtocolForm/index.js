import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, blur } from 'redux-form';

import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import { selectSavedSite } from '../../containers/App/selectors';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  selectAddProtocolFormValues,
  selectAddProtocolFormError,
} from './selectors';
import formValidator from './validator';
const formName = 'addProtocol';

const mapStateToProps = createStructuredSelector({
  savedSite: selectSavedSite(),
  formValues: selectAddProtocolFormValues(),
  formErrors: selectAddProtocolFormError(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)

class AddNewProtocolForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    savedSite: PropTypes.object,
    blur: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    formValues: PropTypes.object,
    formErrors: PropTypes.bool,
    indications: PropTypes.array,
    fullSiteLocations: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('recruitmentPhone', formattedPhoneNumber);
  }

  onSubmitForm(ev) {
    const { onSubmit, formValues, formErrors } = this.props;
    ev.preventDefault();
    onSubmit(formErrors, formValues);
  }

  render() {
    const { savedSite, indications, fullSiteLocations } = this.props;

    const siteLocations = _.map(fullSiteLocations.details, row => ({
      id: row.id,
      name: row.name,
    }));

    return (
      <form className="form-lightbox form-add-protocol" onSubmit={this.onSubmitForm}>
        <div className="add-protocol form-fields">
          <div className="field-row">
            <strong className="label required"><label>Site Location</label></strong>
            <Field
              name="siteLocation"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
            />
          </div>
          <div className="field-row">
            <strong className="label required"><label>Recruitment Phone</label></strong>
            <Field
              name="recruitmentPhone"
              component={Input}
              type="text"
              className="field"
              onBlur={this.onPhoneBlur}
            />
          </div>
          <div className="field-row">
            <strong className="label required"><label>Indication</label></strong>
            <Field
              name="indication_id"
              component={ReactSelect}
              placeholder="Select Indication"
              options={indications}
              className="field"
            />
          </div>
          <div className="field-row">
            <strong className="label required"><label>Protocol</label></strong>
            <Field
              name="protocolNumber"
              component={Input}
              type="text"
              className="field"
            />
          </div>
          <div className="field-row">
            <strong className="label required"><label>Sponsor Name</label></strong>
            <Field
              name="sponsorName"
              component={Input}
              type="text"
              className="field"
            />
          </div>
          <div className="field-row">
            <strong className="label"><label>Sponsor Email</label></strong>
            <Field
              name="sponsorEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={savedSite.saving}>
              {savedSite.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddNewProtocolForm;
