import { validatorFactory } from 'utils/reduxForm';

const schema = {
  couponId: { presence: false },
  creditCard: { presence: { message: '^You need to select credit card' } },
};

const shoppingCartFields = Object.keys(schema);

export { shoppingCartFields };

export default validatorFactory(schema);
