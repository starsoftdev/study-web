import React from 'react'
import t from 'tcomb-form'

let selectedUser = null
export function getModel (selectedUserInput, siteValues) {
  selectedUser = selectedUserInput
  let enumFields = {}
  siteValues.forEach(function (siteIterator) {
    enumFields[siteIterator.id] = siteIterator.name
  })
  const SitesEnum = t.enums(enumFields)
  const spec = {
    email: t.String,
    site: SitesEnum,
    purchase: t.Boolean,
    rewards: t.Boolean
  }

  return t.struct(spec)
}

const emailTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return <input type="text" className="form-control" name="email" defaultValue={selectedUser.email} onChange={function (evt) { locals.onChange(evt.target.value) }} />
  }
})

export const options = {
  fields: {
    email: {
      template: emailTemplate
    }
  }
}

const EditUserForm = {
  getModel,
  options
}

export default EditUserForm
