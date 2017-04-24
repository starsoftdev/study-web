import expect from 'expect';
import { map } from 'lodash';

import videoPageReducer from '../reducer';
import { companyTypesFetched } from '../actions';
import { DEFAULT_COMPANY_TYPES } from '../constants';

describe('VideoPage/reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      companyTypes: DEFAULT_COMPANY_TYPES,
    };
  });
  it('should return the initial state', () => {
    const expectedResult = state;
    expect(videoPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the companyTypesFetched action correctly', () => {
    const response = [
      { id: 1, type: 'Site' },
      { id: 1, type: 'Sponsor' },
      { id: 1, type: 'CRO' },
    ];
    const expectedResult = {
      ...state,
      companyTypes: map(response, 'type'),
    };
    expect(videoPageReducer(state, companyTypesFetched(response))).toEqual(expectedResult);
  });
});
