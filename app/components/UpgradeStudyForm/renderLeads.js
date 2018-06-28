/**
 *
 * Array of lead sources
 *
 */

import React, { PropTypes } from 'react';

import { Field } from 'redux-form';

import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';

import {
  MEDIA_TYPE_LIST,
} from '../../common/constants';

const RenderLeads = ({ fields, availPhoneNumbers }) => (
  <div className="media-type-list row form-group">
    {fields.map((mediaType, index) =>
      <div className="media-type-item" key={index}>
        <button
          className="link-delete"
          onClick={
            (ev) => {
              ev.preventDefault();
              fields.remove(index);
            }
          }
        >
          <i className="icomoon-icon_trash" />
        </button>
        <div className="field-row">
          <span className="label required col-sm-5">
            <label>Media Type</label>
          </span>
          <Field
            name={`${mediaType}.source`}
            component={ReactSelect}
            placeholder="Select Media Type"
            options={MEDIA_TYPE_LIST}
            className="field col-sm-7"
          />
        </div>

        {(() => {
          if (availPhoneNumbers) {
            return (
              <div className="field-row">
                <span className="label required col-sm-5"><label>Phone number</label></span>
                <Field
                  name={`${mediaType}.source_phone`}
                  component={ReactSelect}
                  placeholder="Select Media Type"
                  options={availPhoneNumbers}
                  className="field col-sm-7"
                />
              </div>
            );
          }
          return false;
        })()}

        <div className="field-row">
          <span className="label required col-sm-5"><label>Source Name</label></span>
          <Field
            name={`${mediaType}.sourceName`}
            component={Input}
            type="text"
            className="field col-sm-7"
          />
        </div>
      </div>
    )}
    <div className="field-row col-sm-7 pull-right">
      <span className="label"></span>
      <div className="field">
        <button
          className="add-new-source"
          onClick={(ev) => {
            ev.preventDefault();
            fields.push({});
          }}
        >
          <i className="icomoon-icon_close" /> Add Media Type
        </button>
      </div>
    </div>
  </div>
);

RenderLeads.propTypes = {
  fields: PropTypes.object,
  availPhoneNumbers: PropTypes.array,
};

export default RenderLeads;
