import React from 'react'
import t from 'tcomb-form'

let selectedSite = null
export function getModel (selectedSiteInput) {
  selectedSite = selectedSiteInput
  const spec = {
    name: t.String,
    principalInvestigator: t.String,
    phone: t.String,
    address: t.String
  }

  return t.struct(spec)
}

const nameTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return <input type="text" className="form-control" name="name" defaultValue={selectedSite.name} onChange={function (evt) { locals.onChange(evt.target.value) }} />
  }
})

const principalInvestigatorTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return <input type="text" className="form-control" name="principalInvestigator" defaultValue={selectedSite.principalInvestigator} onChange={function (evt) { locals.onChange(evt.target.value) }} />
  }
})

const phoneTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return <input type="text" className="form-control" name="phone" defaultValue={selectedSite.phone} onChange={function (evt) { locals.onChange(evt.target.value) }} />
  }
})

const addressTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return <input type="text" className="form-control" name="address" defaultValue={selectedSite.address} onChange={function (evt) { locals.onChange(evt.target.value) }} />
  }
})

export const options = {
  fields: {
    name: {
      template: nameTemplate
    },
    principalInvestigator: {
      template: principalInvestigatorTemplate
    },
    phone: {
      template: phoneTemplate
    },
    address: {
      template: addressTemplate
    }
  }
}

const EditSiteForm = {
  getModel,
  options
}

export default EditSiteForm
