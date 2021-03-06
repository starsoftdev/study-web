// import HelpAndSupportPage from '../index';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ReduxForm } from 'redux-form';
import React from 'react';

import configureStore from '../../../store';
import HelpAndSupportPage from '../index';
import { DEFAULT_COMPANY_TYPES } from '../constants';

describe('HelpAndSupportPage/index component', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        companyTypes: DEFAULT_COMPANY_TYPES,
        fetchCompanyTypes: expect.createSpy(),
        onSubmitForm: expect.createSpy(),
      };

      const shallowWrapper = shallow(<HelpAndSupportPage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('should render the refer form', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.contains(<ReduxForm />)).toEqual(true);
  });

  it('should pass correct props to the refer form', () => {
    const { shallowWrapper, props } = setup();

    const formProps = shallowWrapper.find('ReduxForm').props();
    expect(formProps).toContain({ companyTypes: props.companyTypes });
    expect(formProps.onSubmit).toBeA('function');
  });

  it('should call fetchCompanyTypes on load', () => {
    const { props } = setup();
    const mountWrapper = mount( // eslint-disable-line
      <Provider store={configureStore({})}>
        <HelpAndSupportPage {...props} />
      </Provider>
    );

    expect(props.fetchCompanyTypes).toHaveBeenCalled();
  });

  it('should disable submit button by default', () => {
    const { props } = setup();
    const mountWrapper = mount( // eslint-disable-line
      <Provider store={configureStore({})}>
        <HelpAndSupportPage {...props} />
      </Provider>
    );
    const submitButton = mountWrapper.find('input[type="submit"]');
    const submitButtonProps = submitButton.props();

    expect(submitButtonProps.disabled).toEqual(true);
  });
});
