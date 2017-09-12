/**
*
* Array of lead sources
*
*/

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Field } from 'redux-form';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';

import {
  LEAD_SOURCE_LIST,
} from '../../common/constants';

class RenderLeads extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fields: PropTypes.object,
    formValues: PropTypes.object,
  };

  componentWillMount() {
    if (this.props.fields.length === 0) {
      this.props.fields.push({});
    }
  }

  render() {
    const { fields, formValues } = this.props;
    const showAdd = (formValues.leadSource && formValues.leadSource.length >= 1 && formValues.leadSource[0].source_id);
    return (
      <div className="leads-list">
        {fields.map((lead, index) => {
          const showName = formValues.leadSource && formValues.leadSource.length > index && typeof formValues.leadSource[index].source_id !== 'undefined' && formValues.leadSource[index].source_id;
          return (
            <div className="lead-item" key={index}>
              <div className="field-row">
                <strong className="label required"><label>Lead Source</label></strong>
                <Field
                  name={`${lead}.source_id`}
                  component={ReactSelect}
                  placeholder="Select Lead Source"
                  options={LEAD_SOURCE_LIST}
                  className="field"
                />
                <button className="link-delete" onClick={() => fields.remove(index)}>
                  <i className="icomoon-icon_trash" />
                </button>
              </div>
              <div className={classnames('field-row', { hidden: !showName })}>
                <strong className="label required"><label>Source Name</label></strong>
                <Field
                  name={`${lead}.source_name`}
                  component={Input}
                  type="text"
                  className="field"
                />
              </div>
            </div>
          );
        }
        )}
        {
          showAdd &&
          <div className="field-row">
            <strong className="label"></strong>
            <div className="field">
              <button
                className="add-new-source"
                onClick={() => fields.push({})}
              >
                <i className="icomoon-icon_close" /> Add Lead Source
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default RenderLeads;
