import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import expect from 'expect'

import {
  renderComponent,
  spyOn,
  createTestingDispatch,
  simulateEffectSuccess
} from 'utils/testing'
import history from 'utils/history'
import GetReferralForm from '..'

const { Simulate } = TestUtils

describe('GetReferralForm component', () => {
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
      <GetReferralForm.WrappedComponent {...props} />,
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
      .filter(el => el.name === 'firstName')[0]

  const lastNameField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'lastName')[0]

  const emailField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'email')[0]

  const companyField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'companyName')[0]

  const companyTypeField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'companyType')[0]

  const messageField = () =>
    TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
      .filter(el => el.name === 'message')[0]

  it('correctly submits when the form is valid', () => {
    const saveReferralForm = expect.createSpy()

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      companyName: 'test company',
      companyType: 'Site',
      message: 'Sample Message Goes Here...',
    }

    render({
      formData,
      isSaving: false,
      saveReferralForm,
    })

    Simulate.submit(form())
    expect(saveReferralForm).toHaveBeenCalled(formData)
  })

  it('shows the validation error message when submitting and invalid, and disappears when valid again', () => {
    const saveReferralForm = expect.createSpy()

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      companyName: 'test company',
      companyType: 'Site',
      message: 'Sample Message Goes Here...',
    }

    render({
      formData,
      isSaving: false,
      saveReferralForm,
    })

    expect(hasError()).toEqual(false)

    Simulate.change(emailField(0), { target: { value: '' } })
    Simulate.submit(form())
    expect(errorFields().length).toEqual(1)
    expect(hasError()).toEqual(true)

    Simulate.change(emailField(0), { target: { value: 'test@example.com' } })
    expect(emailField(0).value).toEqual('test@example.com')
    Simulate.submit(form())
    expect(hasError()).toEqual(false)
    expect(saveReferralForm).toHaveBeenCalled()
  })

})
