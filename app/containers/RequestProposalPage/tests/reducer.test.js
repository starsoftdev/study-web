import expect from 'expect';
import requestProposalPageReducer from '../reducer';

describe('requestProposalPageReducer', () => {
  it('returns the initial state', () => {
    expect(requestProposalPageReducer(undefined, {})).toEqual({});
  });
});
