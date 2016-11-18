import expect from 'expect';
import receiptsReducer from '../reducer';

describe('receiptsReducer', () => {
  it('returns the initial state', () => {
    expect(receiptsReducer(undefined, {})).toEqual({});
  });
});
