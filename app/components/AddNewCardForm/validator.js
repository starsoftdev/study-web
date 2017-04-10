import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  company: { presence: true },
  firstName: { presence: true },
  lastName: { presence: true },
  number: { presence: true },
  expirationMonth: { presence: true },
  expirationYear: { presence: true },
  billingPostalCode: { presence: true },
};
const addCardFields = Object.keys(schema);
export { addCardFields };
export default validatorFactory(schema);
