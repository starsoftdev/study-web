import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  number: { presence: true },
  code: { presence: true },
  type: { presence: true },
  amount: { presence: true },
  validFrom: { presence: true },
  validTo: { presence: true },
};

export default validatorFactory(schema);
