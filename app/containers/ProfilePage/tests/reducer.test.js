import expect from 'expect';
import profilePageReducer from '../reducer';

describe('profilePageReducer', () => {
  it('returns the initial state', () => {
    expect(profilePageReducer(undefined, {})).toEqual({});
  });
});
