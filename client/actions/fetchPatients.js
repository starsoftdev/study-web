import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchPatients (searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENTS, (cb, dispatch) => {

    function postFilter (err, patients) {
      if (err) {
        return cb(err)
      }

      if (searchParams.includeIndication) {
        const includeIndications = searchParams.includeIndication.split(',')
        patients = _.filter(patients, patientIterator => {
          const foundIndications = _.filter(includeIndications, includeIterator => {
            const foundIndex = _.findIndex(patientIterator.indications, { id: parseInt(includeIterator) })
            return (foundIndex > -1)
          })
          return foundIndications.length
        })
      }

      if (searchParams.excludeIndication) {
        const excludeIndications = searchParams.excludeIndication.split(',')
        patients = _.filter(patients, patientIterator => {
          const foundIndications = _.filter(excludeIndications, excludeIterator => {
            const foundIndex = _.findIndex(patientIterator.indications, { id: parseInt(excludeIterator) })
            return (foundIndex > -1)
          })
          return !foundIndications.length
        })
      }

      if (searchParams.status) {
        patients = _.filter(patients, patientIterator => {
          return (patientIterator.studyPatientCategory.patient_category_id === searchParams.status)
        })
      }

      cb(null, patients)
    }

    let filterObj = {
      include: [
        'indications',
        'source',
        { studyPatientCategory: 'patientCategory' }
      ],
      where: {
        and: [],
      }
    }

    searchParams = searchParams || {}

    if (searchParams.name) {
      filterObj.where.and.push({
        or: [
          {
            firstName: {
              like: '%' + searchParams.name + '%'
            }
          }, {
            lastName: {
              like: '%' + searchParams.name + '%'
            }
          }
        ]
      })
    }
    if (searchParams.ageFrom && !searchParams.ageTo) {
      filterObj.where.and.push({
        age: {
          gt: searchParams.ageFrom
        }
      })
    } else if (!searchParams.ageFrom && searchParams.ageTo) {
      filterObj.where.and.push({
        age: {
          lt: searchParams.ageTo
        }
      })
    } else if (searchParams.ageFrom && searchParams.ageTo) {
      filterObj.where.and.push({
        age: {
          between: [ searchParams.ageFrom, searchParams.ageTo ]
        }
      })
    }
    if (searchParams.bmiFrom && !searchParams.bmiTo) {
      filterObj.where.and.push({
        bmi: {
          gt: searchParams.bmiFrom
        }
      })
    } else if (!searchParams.bmiFrom && searchParams.bmiTo) {
      filterObj.where.and.push({
        bmi: {
          lt: searchParams.bmiTo
        }
      })
    } else if (searchParams.bmiFrom && searchParams.bmiTo) {
      filterObj.where.and.push({
        bmi: {
          between: [ searchParams.bmiFrom, searchParams.bmiTo ]
        }
      })
    }
    if (searchParams.source) {
      filterObj.where.and.push({
        source_id: searchParams.source
      })
    }
    if (searchParams.gender && searchParams.gender !== 'All') {
      filterObj.where.and.push({
        gender: searchParams.gender
      })
    }

    const queryParams = {
      filter: JSON.stringify(filterObj)
    }

    dispatch(searchEntities('/patients', queryParams, postFilter))
  })
}
