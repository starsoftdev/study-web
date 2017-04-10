import expect from 'expect';
import { selectPaymentInformationPageDomain } from '../selectors';

// const selector = selectPaymentInformationPageDomain();

describe('selectPaymentInformationPageDomain', () => {
  const paymentInformationPageDomainSelector = selectPaymentInformationPageDomain();
  it('should select Payment Information page state', () => {
    const state = {};
    const mockedState = {
      paymentInformationPage: state,
    };
    expect(paymentInformationPageDomainSelector(mockedState)).toEqual(state);
  });
});
