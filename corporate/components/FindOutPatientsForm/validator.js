import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  fullName: { presence: true },
  email: { presence: true, email: true },
  company: { presence: true },
  postalCode: { presence: true },
  indication: { presence: true },
  reCaptcha: { presence: true },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
