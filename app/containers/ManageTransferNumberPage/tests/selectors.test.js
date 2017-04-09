import expect from 'expect';
import { selectMangeTransferNumberPageDomain } from '../selectors';

// const selector = selectMangeTransferNumberPageDomain();

describe('selectMangeTransferNumberPageDomain', () => {
  const manageTransferNumberPageSelector = selectMangeTransferNumberPageDomain();
  it('Expect to have unit tests specified', () => {
    const state = {};
    const mockedState = {
      manageTransferNumberPage: state,
    };
    expect(manageTransferNumberPageSelector(mockedState)).toEqual(state);
  });
});
