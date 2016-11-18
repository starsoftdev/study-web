import expect from 'expect';
import proposalsReducer from '../reducer';

describe('proposalsReducer', () => {
  it('returns the initial state', () => {
    expect(proposalsReducer(undefined, {})).toEqual({});
  });
});
