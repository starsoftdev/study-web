import expect from 'expect';
import resetPasswordPageReducer from '../reducer';

describe('resetPasswordPageReducer', () => {
  it('returns the initial state', () => {
    expect(resetPasswordPageReducer(undefined, {})).toEqual({});
  });
});
