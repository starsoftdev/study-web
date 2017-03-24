import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';

import configureStore from '../../../store';
import ListNewStudyPage from '../index';

describe('<ListNewStudyPage />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        siteLocations: [],
        indications: [],
        studyLevels: [],
        fetchSites: expect.createSpy(),
        fetchIndications: expect.createSpy(),
        fetchLevels: expect.createSpy(),
        submitForm: expect.createSpy(),
        formValues: {},
        listNewStudyState: {},
      };

      const shallowWrapper = shallow(<ListNewStudyPage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('should call fetchSites, fetchIndications and fetchLevels on load', () => {
    const { props } = setup();
    const mountWrapper = mount( // eslint-disable-line
      <Provider store={configureStore({})}>
        <ListNewStudyPage {...props} />
      </Provider>
    );

    expect(props.fetchSites).toHaveBeenCalled();
    expect(props.fetchIndications).toHaveBeenCalled();
    expect(props.fetchLevels).toHaveBeenCalled();
  });
});
