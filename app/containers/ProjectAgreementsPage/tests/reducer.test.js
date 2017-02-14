import expect from 'expect';
import projectAgreementsPageReducer from '../reducer';

describe('projectAgreementsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectAgreementsPageReducer(undefined, {})).toEqual({});
  });
});
