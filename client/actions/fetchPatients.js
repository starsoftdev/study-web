import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchPatients (searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENTS, (cb, dispatch) => {

    let filterObj = {
      include: [
        'indication',
        'infoSource',
        { studyPatientCategory: 'patientCategory' }
      ],
      where: {
        and: [],
      }
    }
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
    if (searchParams.includeIndication) {
      filterObj.where.and.push({
        indication_id: {
          inq: searchParams.includeIndication.split(',')
        }
      })
    } else if (searchParams.excludeIndication) {
      filterObj.where.and.push({
        indication_id: {
          nin: searchParams.excludeIndication.split(',')
        }
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

    dispatch(searchEntities('/patients', queryParams, cb))
  })
}
