import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import expect from 'expect'
import moment from 'moment'

import {
  renderComponent,
  spyOn,
  createTestingDispatch,
  simulateEffectSuccess
} from 'utils/testing'
import history from 'utils/history'
import GetReportForm from '..'

const { Simulate } = TestUtils

describe('GetReportForm component', () => {
  let component, store, router

  beforeEach (() => {
    router = {
      createHref: () => '',
      isActive: () => false,
      push: () => '',
      replace: () => '',
      go: () => '',
      goBack: () => '',
      goForward: () => '',
      setRouteLeaveHook: () => ''
    },
    store = {
      getState: () => ({}),
      dispatch: createTestingDispatch(),
      subscribe: () => {}
    }
  })

  function render (props) {
    component = renderComponent(
      <GetReportForm.WrappedComponent {...props} />,
      { store, router }
    )
  }

  // Form
  const form = () =>
    TestUtils.findRenderedDOMComponentWithTag(component, 'form')

  const errorFields = () =>
    TestUtils.scryRenderedDOMComponentsWithClass(component, 'has-error')

  const hasError = () =>
    TestUtils.scryRenderedDOMComponentsWithClass(component, 'has-error').length > 0

  // Fields
  const firstNameField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(select => select.name === 'firstName')[0]

  const lastNameField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'lastName')[0]

  const emailField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'email')[0]

  const companyField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'company')[0]

 const zipCodeField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'zipCode')[0]

  const indicaitonField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'indication')[0]

  it('correctly submits when the form is valid', () => {
    const savePatient = expect.createSpy()

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      company: 'test company',
      zipCode: '10000',
      indication: 'Sample Indication',
    }

    render({
      savingPatient: false,
      patient: formData,
      editing: false,
      savePatient,
    })

    Simulate.submit(form())
    expect(savePatient).toHaveBeenCalled(null, formData)
  })

  it('shows the validation error message when submitting and invalid, and disappears when valid again', () => {
    const savePatient = expect.createSpy()

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      company: 'test company',
      zipCode: '92802',
      indication: 'Sample Indication',
    }

    render({
      savingPatient: false,
      patient: formData,
      editing: false,
      savePatient,
    })

    expect(hasError()).toEqual(false)

    Simulate.change(zipCodeField(0), { target: { value: '' } })
    Simulate.submit(form())
    expect(errorFields().length).toEqual(1)
    expect(hasError()).toEqual(true)

    Simulate.change(zipCodeField(0), { target: { value: '92802' } })
    expect(zipCodeField(0).value).toEqual('92802')
    Simulate.submit(form())
    expect(hasError()).toEqual(false)
    expect(savePatient).toHaveBeenCalled()
  })

})
