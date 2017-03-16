import expect from 'expect';
import dashboardSponsorAdminPageReducer from '../reducer';

describe('dashboardSponsorAdminPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardSponsorAdminPageReducer(undefined, {})).toEqual({});
  });
});
