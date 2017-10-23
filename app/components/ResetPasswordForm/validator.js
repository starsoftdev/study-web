import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  email: { presence: true, email: true, emailDomain: true },
  reCaptcha: { presence: true },
};

export default validatorFactory(schema);
