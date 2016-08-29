'use strict'

import React from 'react'
import { shallow, mount, render } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

import BlastForm from '../index'
const { expect } = chai

describe('BlastForm component', () => {
  it('form has category filter, that works correctly', function () {
    const wrapper = shallow(<BlastForm />)
    const props = {
      isFetchingPatientCategories: false,
      isFetchingPatients: false,
      isFetchingStudySources: false,
      patientCategories: [
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 1,
          id: 1,
          name: 'New Patient'
        },
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 2,
          id: 2,
          name: 'Call Attempted'
        },
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 3,
          id: 3,
          name: 'Not Qualified'
        },
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 4,
          id: 4,
          name: 'Action Needed'
        },
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 5,
          id: 5,
          name: 'Scheduled'
        },
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 6,
          id: 6,
          name: 'Consented'
        },
        {
          autoCreate: true,
          autoCreateIsNewPatientDefault: true,
          autoCreateOrderNum: 7,
          id: 7,
          name: 'Randomized'
        }
      ],
      patientsByStudy: [
        {
          count: 5,
          limit: 10,
          offset: 0,
          patientCategory: {
            id: 1,
            name: 'New Patient'
          },
          patients: [
            {
              age: null,
              bmi: null,
              created: '2016-08-25T14:48:31.000Z',
              email: 'test@example.com',
              firstName: 'John',
              gender: null,
              id: 7,
              indication_id: '1',
              lastAction: '2016-08-25T14:48:31.000Z',
              lastName: 'Doe',
              phone: '+15105561453',
              source_id: '1',
              studyPatientCategory: {
                id: 1,
                isNewPatientDefault: true,
                orderNum: 1,
                patientCategory: {
                  autoCreate: true,
                  autoCreateIsNewPatientDefault: true,
                  autoCreateOrderNum: 1,
                  id: 1,
                  name: 'New Patient'
                }
              },
              study_patient_category_id: 1
            },
            {
              age: null,
              bmi: null,
              created: '2016-08-25T14:48:31.000Z',
              email: 'test2@example.com',
              firstName: 'Jane',
              gender: null,
              id: 8,
              indication_id: '1',
              lastAction: '2016-08-25T14:48:31.000Z',
              lastName: 'Doe',
              phone: '+15105560623',
              source_id: '1',
              studyPatientCategory: {
                id: 1,
                isNewPatientDefault: true,
                orderNum: 1,
                patientCategory: {
                  autoCreate: true,
                  autoCreateIsNewPatientDefault: true,
                  autoCreateOrderNum: 1,
                  id: 1,
                  name: 'New Patient'
                }
              },
              study_patient_category_id: 1
            }
          ],
          total: 2
        }
      ],
      studyId: -100,
      studySources: [
        {
          call_number_id: null,
          id: 1,
          infoSource: {},
          info_source_id: '1',
          landing_page_id: null,
          study_id: '-100',
          text_number_id: null
        },
        {
          call_number_id: null,
          id: 2,
          infoSource: {},
          info_source_id: '2',
          landing_page_id: null,
          study_id: '-100',
          text_number_id: null
        },
        {
          call_number_id: null,
          id: 3,
          infoSource: {},
          info_source_id: '3',
          landing_page_id: null,
          study_id: '-100',
          text_number_id: null
        }
      ]
    }

    wrapper.setProps(props)
    wrapper.setState({ showModal: true })
    expect(wrapper.find('.category-filter')).to.have.length(1)
    expect(wrapper.find('.category-filter').children()).to.have.length(8)
    wrapper.find('#category-1').simulate('change', { target: { checked: true, name: 'category-1' } })
    expect(wrapper.state().filter.categories).to.eql([ '1' ])
  })
})
