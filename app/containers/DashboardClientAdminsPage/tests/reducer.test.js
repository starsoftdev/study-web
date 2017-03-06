import expect from 'expect';
import dashboardClientAdminsPageReducer from '../reducer';

describe('dashboardClientAdminsPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardClientAdminsPageReducer(undefined, {})).toEqual({});
  });
});
