import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  reCaptcha: { presence: true },
};

export default validatorFactory(schema);
