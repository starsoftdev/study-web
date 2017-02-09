import expect from 'expect';
import reportViewPageReducer from '../reducer';

describe('reportViewPageReducer', () => {
  it('returns the initial state', () => {
    expect(reportViewPageReducer(undefined, {})).toEqual({});
  });
});
