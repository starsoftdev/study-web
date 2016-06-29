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

export const options = {
  fields: {}
}

const EditSiteForm = {
  getModel,
  options
}

export default EditSiteForm
