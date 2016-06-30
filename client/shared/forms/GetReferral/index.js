import React from 'react'
import t from 'tcomb-form'

import { ContactCompanyTypes } from 'constants'

export const schema = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  companyName: t.String,
  companyType: t.enums(ContactCompanyTypes),
  message: t.maybe(t.String),
})

export const layout = function (locals) {
  return (
    <fieldset>
      <div className="row">
        <div className="col-md-8">
          <h1>Refer</h1>
        </div>
      </div>
      <div className="row">
        <label className="col-md-4">
          Contact Name <span className="asterisk">*</span>
        </label>
        <div className="col-md-4">
          {locals.inputs.firstName}
        </div>
        <div className="col-md-4">
          {locals.inputs.lastName}
        </div>
      </div>
      <div className="row">
        <label className="col-md-4">
          Contact Email <span className="asterisk">*</span>
        </label>
        <div className="col-md-8">
          {locals.inputs.email}
        </div>
      </div>
      <div className="row">
        <label className="col-md-4">
          Contact Company Name <span className="asterisk">*</span>
        </label>
        <div className="col-md-8">
          {locals.inputs.companyName}
        </div>
      </div>
      <div className="row">
        <label className="col-md-4">
          Contact Company Type <span className="asterisk">*</span>
        </label>
        <div className="col-md-8">
          {locals.inputs.companyType}
        </div>
      </div>
      <div className="row">
        <label className="col-md-4">Message</label>
        <div className="col-md-8">
          {locals.inputs.message}
        </div>
      </div>
    </fieldset>
  )
}

export const options = {
  template: layout,
  auto: 'none',
  fields: {
    firstName: {
      attrs: {
        placeholder: 'First Name'
      }
    },
    lastName: {
      attrs: {
        placeholder: 'Last Name'
      }
    },
    companyType: {
      nullOption: { value: '', text: 'Select Company Type' },
    },
    message: {
      type: 'textarea',
      attrs: {
        rows: 5,
      }
    }
  }
}

const GetProposalForm = {
  schema,
  layout,
  options,
}

export default GetProposalForm
