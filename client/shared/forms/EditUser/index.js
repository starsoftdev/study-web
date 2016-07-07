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
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedUser)? selectedUser.email: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
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
