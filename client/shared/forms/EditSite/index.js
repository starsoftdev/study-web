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
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedSite)? selectedSite.name: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const principalInvestigatorTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedSite)? selectedSite.principalInvestigator: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const phoneTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedSite)? selectedSite.phone: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const addressTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedSite)? selectedSite.address: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
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
