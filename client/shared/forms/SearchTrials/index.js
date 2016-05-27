import React from 'react'
import t from 'tcomb-form'

import { EnumOfDistances, DistanceOptions, StudyTypes } from 'constants'

export function getModel (value) {
  const spec = {
    postalCode: t.maybe(t.String),
    distance: t.enums.of(EnumOfDistances),
    studyType: t.enums(StudyTypes),
  }

  return t.struct(spec)
}

const distanceOptions = {
  nullOption: false,
  options: DistanceOptions, // To avoid automatic sorting
}

const studyTypeOptions = {
  nullOption: false,
}

export let layout = function (locals) {

}

export const options = {
  // template: layout,
  auto: 'placeholders',
  fields: {
    postalCode: {
      attrs: {
        placeholder: 'Postal Code',
      }
    },
    distance: distanceOptions,
    studyType: studyTypeOptions,
  }
}

const SearchTrialsForm = {
  getModel,
  // layout,
  options,
}

export default SearchTrialsForm
