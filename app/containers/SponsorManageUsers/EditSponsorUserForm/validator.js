import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  email: { email: true },
  protocols: { presence: true },
};

export default validatorFactory(schema);
