import expect from 'expect';
import dashboardCouponPageReducer from '../reducer';

describe('dashboardCouponPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardCouponPageReducer(undefined, {})).toEqual({});
  });
});
