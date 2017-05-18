import expect from 'expect';
import dashboardNotePageReducer from '../reducer';

describe('dashboardNotePageReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardNotePageReducer(undefined, {})).toEqual({});
  });
});
