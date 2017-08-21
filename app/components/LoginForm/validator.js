import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  password: { presence: true },
  reCaptcha: { presence: true },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
