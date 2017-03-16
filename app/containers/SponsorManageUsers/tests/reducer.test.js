import expect from 'expect';
import sponsorManageUsersReducer from '../reducer';

describe('sponsorManageUsersReducer', () => {
  it('returns the initial state', () => {
    expect(sponsorManageUsersReducer(undefined, {})).toEqual({});
  });
});
