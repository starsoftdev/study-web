import React from 'react'
import t from 'tcomb-form'

export function getModel() {
  const spec = {
    username: t.maybe(t.String)
  }

  return t.struct(spec)
}

export let layout = function (locals) {
  return (
    <div>
      {locals.inputs.username}
    </div>
  )
}

export const options = {
  template: layout,
  auto: 'none',
  fields: {
    username: {
      attrs: {
        placeholder: 'Search user name...'
      }
    }
  }
}

const SearchUsersForm = {
  getModel,
  options
}

export default SearchUsersForm
