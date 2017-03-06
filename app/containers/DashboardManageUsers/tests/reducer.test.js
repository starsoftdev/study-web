import expect from 'expect';
import dashboardManageUsersReducer from '../reducer';

describe('dashboardManageUsersReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardManageUsersReducer(undefined, {})).toEqual({});
  });
});
