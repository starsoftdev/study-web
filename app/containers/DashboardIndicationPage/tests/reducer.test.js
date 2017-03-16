import expect from 'expect';
import dashboardIndicationPageReducer from '../reducer';

describe('dashboardIndicationPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardIndicationPageReducer(undefined, {})).toEqual({});
  });
});
