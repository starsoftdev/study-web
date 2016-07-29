import React from 'react'
import t from 'tcomb-form'

export function getModel () {
  const spec = {
    name: t.String,
    piFirstName: t.String,
    piLastName: t.String,
    phone: t.String,
    address: t.String,
    city: t.String,
    state: t.String,
    zip: t.String,
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

const piFirstNameTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const piLastNameTemplate = t.form.Form.templates.textbox.clone({
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

const cityTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const stateTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const zipTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                  placeholder={locals.placeholder} type={locals.type} value={locals.value}
                  onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

export const options = {
  fields: {
    name: {
      template: nameTemplate,
    },
    piFirstName: {
      template: piFirstNameTemplate,
      label: 'PI First Name',
    },
    piLastName: {
      template: piLastNameTemplate,
      label: 'PI Last Name',
    },
    phone: {
      template: phoneTemplate,
    },
    address: {
      template: addressTemplate,
    },
    city: {
      template: cityTemplate,
    },
    state: {
      template: stateTemplate,
      label: 'State / Province',
    },
    zip: {
      template: zipTemplate,
      label: 'Postal Code',
    }
  }
}

const AddSiteForm = {
  getModel,
  options
}

export default AddSiteForm
