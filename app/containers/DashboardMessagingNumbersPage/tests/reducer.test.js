import expect from 'expect';
import dashboardMessagingNumbersPageReducer from '../reducer';

describe('dashboardMessagingNumbersPageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardMessagingNumbersPageReducer(undefined, {})).toEqual({});
  });
});
