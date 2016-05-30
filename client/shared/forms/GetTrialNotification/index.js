import React from 'react'
import t from 'tcomb-form'

export function getModel (value) {
  const spec = {
    fullName: t.String,
    email: t.String,
    phone: t.String,
  }

  return t.struct(spec)
}

export let layout = function (locals) {

}

export const options = {
  // template: layout,
  auto: 'placeholders',
  fields: {
    fullName: {
      attrs: {
        placeholder: 'Enter Your First & Last Name',
      }
    },
    email: {
      attrs: {
        placeholder: 'Enter Your Email Address',
      }
    },
    phone: {
      attrs: {
        placeholder: 'Enter Your Phone Number',
      }
    },
  }
}

const GetTrialNotificationForm = {
  getModel,
  // layout,
  options,
}

export default GetTrialNotificationForm
