import React from 'react'
import t from 'tcomb-form'

export function getModel (siteValues) {
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

export const options = {
  fields: {
    siteId: {
      label: 'Site Location'
    }
  }
}

const AddUserForm = {
  getModel,
  options
}

export default AddUserForm
