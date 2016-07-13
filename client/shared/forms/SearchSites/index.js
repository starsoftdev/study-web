import React from 'react'
import t from 'tcomb-form'

export function getModel () {
  const spec = {
    name: t.maybe(t.String)
  }

  return t.struct(spec)
}

export let layout = function (locals) {
  return (
    <div>
      {locals.inputs.name}
    </div>
  )
}

export const options = {
  template: layout,
  auto: 'none',
  fields: {
    name: {
      attrs: {
        placeholder: 'Search site name...'
      }
    }
  }
}

const SearchSitesForm = {
  getModel,
  options
}

export default SearchSitesForm
