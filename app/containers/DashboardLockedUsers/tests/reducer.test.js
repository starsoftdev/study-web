import expect from 'expect';
import dashboardLockedUsersReducer from '../reducer';

describe('dashboardLockedUsersReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardLockedUsersReducer(undefined, {})).toEqual({});
  });
});
