import expect from 'expect';
import dashboardPortalsPageReducer from '../reducer';

describe('dashboardPortalsPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardPortalsPageReducer(undefined, {})).toEqual({});
  });
});
