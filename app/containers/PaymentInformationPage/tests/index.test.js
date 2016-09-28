// import PaymentInformationPage from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import PaymentInformationPage from 'containers/PaymentInformationPage';
import React from 'react';
import AddNewCardButton from 'components/AddNewCardButton';

describe('<PaymentInformationPage />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        deleteCreditCard: expect.createSpy(),
        addCreditCard: expect.createSpy(),
      };

      const shallowWrapper = shallow(<PaymentInformationPage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('should render the AddNewCardButton', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.contains(<AddNewCardButton />)).toEqual(true);
  });
});
