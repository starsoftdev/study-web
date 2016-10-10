import expect from 'expect';
import listNewStudyPageReducer from '../reducer';

describe('listNewStudyPageReducer', () => {
  it('returns the initial state', () => {
    expect(listNewStudyPageReducer(undefined, {})).toEqual({});
  });
});
