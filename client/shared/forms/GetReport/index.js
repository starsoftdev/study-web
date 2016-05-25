import React from 'react'
import t from 'tcomb-form'

export function getModel (value) {
  const spec = {
    id: t.maybe(t.String),
    firstName: t.String,
    lastName: t.String,
    email: t.String,
    company: t.String,
    zipCode: t.String,
    indication: t.String,
  }

  return t.struct(spec)
}

export let layout = function (locals) {

}

export const options = {
  // template: layout,
  auto: 'placeholders',
  fields: {
    id: {
      type: 'hidden',
    },
    firstName: {
      attrs: {
        placeholder: 'Enter Your First Name',
      }
    },
    lastName: {
      attrs: {
        placeholder: 'Enter Your Last Name',
      }
    },
    email: {
      attrs: {
        placeholder: 'Enter Your Email Address',
      }
    },
    company: {
      attrs: {
        placeholder: 'Enter Your Company',
      }
    },
    zipCode: {
      attrs: {
        placeholder: 'Enter Your Zip Code',
      }
    },
    indication: {
      attrs: {
        placeholder: 'Indication',
      }
    },
  }
}

const GetReportForm = {
  getModel,
  // layout,
  options,
}

export default GetReportForm
