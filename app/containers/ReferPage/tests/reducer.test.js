import expect from 'expect';
import referPageReducer from '../reducer';

describe('referPageReducer', () => {
  it('returns the initial state', () => {
    expect(referPageReducer(undefined, {})).toEqual({});
  });
});
