import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  code: { presence: true },
  neverExpires: { presence: false },
  type: { presence: true },
  amount: { presence: true },
  validFrom: { presence: false },
  validTo: { presence: false },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
