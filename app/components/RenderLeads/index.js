/**
*
* Array of lead sources
*
*/

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Field } from 'redux-form';
import _ from 'lodash';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';

import {
  LEAD_SOURCE_LIST,
} from '../../common/constants';

class RenderLeads extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fields: PropTypes.object,
    formValues: PropTypes.object,
    meta: PropTypes.object,
    disableDelete: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isClientEditForm: PropTypes.bool,
    messagingNumbers: PropTypes.object,
    initialLeadSources: PropTypes.array,
  };

  componentWillMount() {
    if (this.props.fields.length === 0) {
      this.props.fields.push({ source: null });
    }
  }

  render() {
    const { fields, formValues, messagingNumbers, initialLeadSources } = this.props;
    const showAdd = (formValues.leadSource && formValues.leadSource.length >= 1 && formValues.leadSource[0].source);

    return (
      <div className="leads-list">
        {fields.map((lead, index) => {
          const showName = formValues.leadSource && formValues.leadSource.length > index && typeof formValues.leadSource[index].source !== 'undefined' && formValues.leadSource[index].source;
          let landingHref = null;
          let googleHref = null;
          let initObject = null;

          if (initialLeadSources && initialLeadSources.length > 0) {
            initObject = _.find(initialLeadSources, (o) => {
              if (formValues.leadSource && formValues.leadSource[index]) {
                return (o.studySourceId === formValues.leadSource[index].studySourceId);
              } else {
                return false;
              }
            });
          }

          let messagingNumbersOptions = [];
          if (this.props.isAdmin) {
            messagingNumbersOptions = messagingNumbers.details.map(item => ({
              value: item.id,
              label: item.phone_number,
            }));

            if (initObject && initObject.messagingNumber) {
              messagingNumbersOptions.unshift(initObject.messagingNumber);
            }
            if (initObject && initObject.url && formValues.leadSource && formValues.leadSource[index]) {
              landingHref = initObject.url ? `/${formValues.leadSource[index].studyId}-${initObject.landingPageUrl.toLowerCase().replace(/ /ig, '-')}${(formValues.leadSource[index].url) ? `?utm=${formValues.leadSource[index].url}` : ''}` : '';
              googleHref = initObject.googleUrl ? initObject.googleUrl : '';
            }
          }

          const disableDeleteFirstItem = (this.props.isAdmin && index === 0);

          const urlLink = landingHref ? <a href={landingHref} className="landig-link study-source-link" target="_blank">Url #{(index + 1)}</a> : `Url #${(index + 1)}`;
          const googleUrlLink = googleHref ? <a href={googleHref} className="landig-link study-source-link" target="_blank">Google Url #{(index + 1)}</a> : `Google Url #${(index + 1)}`;

          const needToShowMessagingNumber = this.props.isClientEditForm && formValues.leadSource && formValues.leadSource[index] && formValues.leadSource[index].messagingNumber;
          const needToShowGoogleUrl = this.props.isClientEditForm && formValues.leadSource && formValues.leadSource[index] && formValues.leadSource[index].googleUrl;

          return (
            <div className="lead-item" key={index}>
              <div className="field-row dropdown">
                <strong className={classnames('label', (!this.props.disableDelete || (formValues.leadSource[index] && formValues.leadSource[index].isNew)) ? 'required' : '')}><label>Lead Source #{(index + 1)}</label></strong>
                <Field
                  name={`${lead}.source`}
                  component={ReactSelect}
                  objectValue
                  placeholder="Select Lead Source"
                  options={LEAD_SOURCE_LIST}
                  className="field"
                  disabled={this.props.disableDelete && (formValues.leadSource[index] && !formValues.leadSource[index].isNew)}
                />
                {((!this.props.disableDelete || (formValues.leadSource[index] && formValues.leadSource[index].isNew)) && !disableDeleteFirstItem) &&
                  <div className="link-delete" onClick={() => fields.remove(index)}>
                    <i className="icomoon-icon_trash" />
                  </div>
                }
              </div>
              {
                showName && (
                  <div className={classnames('field-row')}>
                    <strong className="label required"><label>Source Name #{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.source_name`}
                      component={Input}
                      type="text"
                      className="field"
                    />
                  </div>
                )
              }

              {
                showName && this.props.isAdmin && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>Messaging Number #{(index + 1)}</label></strong>
                    <Field
                      className="field"
                      name={`${lead}.messagingNumber`}
                      component={ReactSelect}
                      placeholder="Select Messaging Number"
                      searchPlaceholder="Search"
                      searchable
                      objectValue
                      options={messagingNumbersOptions}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                )
              }
              {
                showName && this.props.isAdmin && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>Redirect Number #{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.recruitmentPhone`}
                      component={Input}
                      type="text"
                      className="field"
                      isDisabled
                    />
                  </div>
                )
              }
              {
                showName && this.props.isAdmin && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{urlLink}</label></strong>
                    <Field
                      name={`${lead}.url`}
                      component={Input}
                      type="text"
                      className="field"
                    />
                  </div>
                )
              }

              {
                showName && needToShowMessagingNumber && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>Messaging Number #{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.messagingNumber`}
                      component={Input}
                      type="text"
                      className="field special-cursor-text"
                      isDisabled
                    />
                  </div>
                )
              }
              {
                showName && (this.props.isAdmin || needToShowGoogleUrl) && (
                  <div className={classnames('field-row')}>
                    <strong className="label"><label>{googleUrlLink}</label></strong>
                    <Field
                      name={`${lead}.googleUrl`}
                      component={Input}
                      type="text"
                      className="field special-cursor-text"
                      isDisabled={needToShowGoogleUrl}
                    />
                  </div>
                )
              }
            </div>
          );
        }
        )}
        {
          showAdd &&
          <div className="field-row">
            <strong className="label"></strong>
            <div className="field">
              <div
                className="add-new-source"
                onClick={() => fields.push({ isNew: true })}
              >
                <i className="icomoon-icon_close" /> Add Lead Source
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default RenderLeads;
