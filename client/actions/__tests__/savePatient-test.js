import expect from 'expect'

import { createTestingDispatch } from 'utils/testing'
import savePatient from '../savePatient'

describe('savePatient action creator', () => {
  it('sends the formatted data to the update patient endpoint when there is a patientId', () => {
  })

  it('sends the formatted data to the create patient endpoint when there is no patientId', () => {
    const dispatch = createTestingDispatch()
    const router = {}

    const patientData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      phone: '',
      siteAddress: '',
      organization: '',
      protocolNumber: '',
      sponsorEmail: '',
      croEmail: '',
      indication: '',
      exposureLevel: '',
      campaignLength: '',
      patientMessagingSuite: false,
    }

    dispatch(savePatient(null, patientData, router))

    const [ startAction, apiCall ] = dispatch.flattenAsyncActions(
      () => ({
        authorization: {
          authData: {
            lastRefresh: new Date().valueOf()
          }
        }
      })
    )

    expect(startAction).toEqual({
      type: 'CREATE_PATIENT',
      status: 'started',
      patientId: null,
      patientData
    })

    expect(apiCall.type).toEqual('EFFECT_COMPOSE')
    expect(apiCall.payload.type).toEqual('EFFECT_FETCH')
    expect(apiCall.payload.url).toEqual(`${API_URL}/patients`)
    expect(apiCall.payload.params.method).toEqual('post')
    expect(JSON.parse(apiCall.payload.params.body)).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      phone: '',
      siteAddress: '',
      organization: '',
      protocolNumber: '',
      sponsorEmail: '',
      croEmail: '',
      indication: '',
      exposureLevel: '',
      campaignLength: '',
      patientMessagingSuite: false,
    })
  })
})
