import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  description: { presence: true },
  code: { presence: true },
  neverExpires: { presence: false },
  type: { presence: true },
  amount: { presence: true, numericality: { greaterThan: 0 } },
  validFrom: { presence: false },
  validTo: { presence: false },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
