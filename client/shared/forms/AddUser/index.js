import React from 'react'
import t from 'tcomb-form'

export function getModel (siteValues) {
  let enumFields = {}
  siteValues.forEach(function (siteIterator) {
    enumFields[siteIterator.id] = siteIterator.name
  })
  const SitesEnum = t.enums(enumFields)
  const spec = {
    name: t.String,
    email: t.String,
    site: SitesEnum,
  }

  return t.struct(spec)
}

const emailTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
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

const AddUserForm = {
  getModel,
  options
}

export default AddUserForm
