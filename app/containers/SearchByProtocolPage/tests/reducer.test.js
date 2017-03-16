import expect from 'expect';
import searchByProtocolPageReducer from '../reducer';

describe('searchByProtocolPageReducer', () => {
  it('returns the initial state', () => {
    expect(searchByProtocolPageReducer(undefined, {})).toEqual({});
  });
});
