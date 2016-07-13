import React from 'react'
import t from 'tcomb-form'

let selectedUser = null
export function getModel (siteValues, selectedUserInput) {
  selectedUser = selectedUserInput
  let enumFields = { 0: 'All Sites' }
  siteValues.forEach(function (siteIterator) {
    enumFields[siteIterator.id] = siteIterator.name
  })
  const SitesEnum = t.enums(enumFields)
  const spec = {
    firstName: t.String,
    lastName: t.String,
    email: t.String,
    siteId: SitesEnum,
    purchase: t.Bool,
    reward: t.Bool
  }

  return t.struct(spec)
}

const firstNameTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedUser)? selectedUser.firstName: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const lastNameTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedUser)? selectedUser.lastName: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const emailTemplate = t.form.Form.templates.textbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} className="form-control" name={locals.name}
                   placeholder={locals.placeholder} type={locals.type} defaultValue={(selectedUser)? selectedUser.email: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const purchaseTemplate = t.form.Form.templates.checkbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} name={locals.name}
                   type={locals.type} defaultValue={(selectedUser)? selectedUser.roleForClient.purchase: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

const rewardTemplate = t.form.Form.templates.checkbox.clone({
  renderInput: (locals) => {
    return (<input disabled={locals.disabled} name={locals.name}
                   type={locals.type} defaultValue={(selectedUser)? selectedUser.roleForClient.reward: null}
                   onChange={function (evt) { locals.onChange(evt.target.value) }} />)
  }
})

export const options = {
  fields: {
    firstName: {
      template: firstNameTemplate,
    },
    lastName: {
      template: lastNameTemplate,
    },
    email: {
      template: emailTemplate,
    },
    siteId: {
      label: 'Site Location'
    },
    purchase: {
      template: purchaseTemplate
    },
    reward: {
      template: rewardTemplate
    }
  }
}

const EditUserForm = {
  getModel,
  options,
}

export default EditUserForm
