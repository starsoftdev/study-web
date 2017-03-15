import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  name: { presence: true },
  tier: { presence: true },
};

export default validatorFactory(schema);
