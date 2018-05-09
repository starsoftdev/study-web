/**
*
* IrbAdCreationForm
*
*/

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import formValidator from './validator';
import { translate } from '../../../common/utilities/localization';

@reduxForm({ form: 'irbAdCreation', validate: formValidator })
class IrbAdCreationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = {
      fileName: '',
    };
  }

  handleFileChange(e) {
    this.setState({ fileName: e.target.files[0].name });
  }

  handleFileNameEmpty() {
    this.setState({ fileName: '' });
  }

  render() {
    const { siteLocations, indications, handleSubmit } = this.props;
    const { fileName } = this.state;

    return (
      <form className="form-study" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label htmlFor="site-location">{translate('portals.component.irbAdCreationForm.siteLabel')}</label></strong>
            <div className="field">
              <Field
                name="siteLocation"
                component={ReactSelect}
                placeholder={translate('portals.component.irbAdCreationForm.sitePlaceholder')}
                options={siteLocations}
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label required"><label htmlFor="indication">{translate('portals.component.irbAdCreationForm.indicationLabel')}</label></strong>
            <div className="field">
              <Field
                name="indication_id"
                component={ReactSelect}
                placeholder={translate('portals.component.irbAdCreationForm.indicationPlaceholder')}
                options={indications}
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label htmlFor="name">{translate('portals.component.irbAdCreationForm.irbNameLabel')}</label></strong>
            <div className="field">
              <Field
                name="irbName"
                component={Input}
                value=""
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label htmlFor="email">{translate('portals.component.irbAdCreationForm.irbEmailLabel')}</label></strong>
            <div className="field">
              <Field
                name="irbEmail"
                component={Input}
                value=""
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label htmlFor="compensationAmount">{translate('portals.component.irbAdCreationForm.compensationLabel')}</label></strong>
            <div className="field">
              <Field
                name="compensationAmount"
                component={Input}
                value=""
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label htmlFor="clinicaltrialGovLink">{translate('portals.component.irbAdCreationForm.clinicalTrialsLinkLabel')}</label></strong>
            <div className="field">
              <Field
                name="clinicaltrialGovLink"
                component={Input}
              />
            </div>
          </div>

          <div className="field-row">
            <strong className="label"><label htmlFor="clinicaltrialGovLink">{translate('portals.component.irbAdCreationForm.uploadBlindedProtocolLabel')}</label></strong>
            <div className="field">
              <label
                htmlFor="irb_file"
                data-text={translate('portals.component.irbAdCreationForm.browseBtn')}
                data-hover-text={translate('portals.component.irbAdCreationForm.browseBtnHoverText')}
                className="btn btn-gray upload-btn"
              ></label>
              <Field
                id="irb_file"
                name="file"
                onChange={this.handleFileChange}
                component={Input}
                type="file"
              />
              <strong className="label lfilename"><label className="filename" htmlFor="irb_filename">{fileName}</label></strong>
            </div>
          </div>

          <div className="field-row textarea">
            <strong className="label"><label htmlFor="notes">{translate('portals.component.irbAdCreationForm.notesLabel')}</label></strong>
            <div className="field">
              <Field
                name="notes"
                component={Input}
                componentClass="textarea"
              />
            </div>
          </div>

        </div>
      </form>
    );
  }
}

export default IrbAdCreationForm;

