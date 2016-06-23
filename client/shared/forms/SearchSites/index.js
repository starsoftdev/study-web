import React from 'react'
import t from 'tcomb-form'

export function getModel (value) {
  const spec = {
    name: t.maybe(t.String)
  }

  return t.struct(spec)
}

export let layout = function (locals) {

}

export const options = {
  // template: layout,
  auto: 'placeholders',
  fields: {
    name: {}
  }
}

const SearchSitesForm = {
  getModel,
  // layout,
  options
}

export default SearchSitesForm
