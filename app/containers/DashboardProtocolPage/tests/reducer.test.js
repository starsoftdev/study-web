import expect from 'expect';
import dashboardProtocolPageReducer from '../reducer';

describe('dashboardProtocolPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardProtocolPageReducer(undefined, {})).toEqual({});
  });
});
