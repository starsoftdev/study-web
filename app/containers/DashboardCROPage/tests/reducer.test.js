import expect from 'expect';
import dashboardCROPageReducer from '../reducer';

describe('dashboardCROPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardCROPageReducer(undefined, {})).toEqual({});
  });
});
