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
    messagingNumbers: PropTypes.object,
    initialLeadSources: PropTypes.array,
  };

  componentWillMount() {
    if (this.props.fields.length === 0) {
      this.props.fields.push({ source_id: null });
    }
  }

  render() {
    const { fields, formValues, messagingNumbers, initialLeadSources } = this.props;
    const showAdd = (formValues.leadSource && formValues.leadSource.length >= 1 && formValues.leadSource[0].source_id);


    return (
      <div className="leads-list">
        {fields.map((lead, index) => {
          const showName = formValues.leadSource && formValues.leadSource.length > index && typeof formValues.leadSource[index].source_id !== 'undefined' && formValues.leadSource[index].source_id;
          let initObject = null;

          if (initialLeadSources && initialLeadSources.length > 0) {
            initObject = _.find(initialLeadSources, (o) => (o.studySourceId === formValues.leadSource[index].studySourceId));
          }

          const messagingNumbersOptions = messagingNumbers.details.map(item => ({
            value: item.id,
            label: item.phone_number,
          }));

          if (initObject && initObject.messagingNumber) {
            messagingNumbersOptions.unshift(initObject.messagingNumber);
          }

          return (
            <div className="lead-item" key={index}>
              <div className="field-row dropdown">
                <strong className="label required"><label>Lead Source #{(index + 1)}</label></strong>
                <Field
                  name={`${lead}.source_id`}
                  component={ReactSelect}
                  objectValue
                  placeholder="Select Lead Source"
                  options={LEAD_SOURCE_LIST}
                  className="field"
                  disabled={this.props.disableDelete && (formValues.leadSource[index] && !formValues.leadSource[index].isNew)}
                />
                {(!this.props.disableDelete || (formValues.leadSource[index] && formValues.leadSource[index].isNew)) &&
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
                    <strong className="label required"><label>Messaging Number #{(index + 1)}</label></strong>
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
                    <strong className="label required"><label>Redirect Number #{(index + 1)}</label></strong>
                    <Field
                      name={`${lead}.recruitmentPhone`}
                      component={Input}
                      type="text"
                      className="field"
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
