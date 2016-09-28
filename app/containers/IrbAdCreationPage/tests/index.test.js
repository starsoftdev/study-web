// import IrbAdCreationPage from '../index';

import expect from 'expect';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'store';
import { ReduxForm } from 'redux-form';
import { IrbAdCreationPage } from 'containers/IrbAdCreationPage';
// import { shallow } from 'enzyme';
// import React from 'react';

describe('<IrbAdCreationPage />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        siteLocations: [],
        indications: [],
        fetchSites: expect.createSpy(),
        fetchIndications: expect.createSpy(),
        onSubmitForm: expect.createSpy(),
      };

      const shallowWrapper = shallow(<IrbAdCreationPage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('should render the IrbAdCreation form', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.contains(<ReduxForm />)).toEqual(true);
  });

  it('should pass correct props to the IrbAdCreation form', () => {
    const { shallowWrapper, props } = setup();

    const formProps = shallowWrapper.find('ReduxForm').props();

    expect(formProps).toContain({ siteLocations: props.siteLocations });
    expect(formProps).toContain({ indications: props.indications });
    expect(formProps.onSubmit).toBeA('function');
  });

  it('should call fetchSites and fetchIndications on load', () => {
    const { props } = setup();
    const mountWrapper = mount( // eslint-disable-line
      <Provider store={configureStore({})}>
        <IrbAdCreationPage {...props} />
      </Provider>
    );

    expect(props.fetchSites).toHaveBeenCalled();
    expect(props.fetchIndications).toHaveBeenCalled();
  });
});
