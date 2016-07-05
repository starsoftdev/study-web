import React from 'react'
import t from 'tcomb-form'

export function getModel () {
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
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const principalInvestigatorTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const phoneTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const addressTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
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

const AddSiteForm = {
  getModel,
  options
}

export default AddSiteForm
