import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  email: { presence: true, email: true, emailDomain: true },
  password: { presence: true },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
