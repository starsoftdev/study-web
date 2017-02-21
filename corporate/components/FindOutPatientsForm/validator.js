import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  fullName: { presence: true },
  email: { presence: true, email: true },
  company: { presence: true },
  postalCode: { presence: true },
  indication: { presence: true },
};

export default validatorFactory(schema);
