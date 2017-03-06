import expect from 'expect';
import dashboardSponsorPageReducer from '../reducer';

describe('dashboardSponsorPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardSponsorPageReducer(undefined, {})).toEqual({});
  });
});
