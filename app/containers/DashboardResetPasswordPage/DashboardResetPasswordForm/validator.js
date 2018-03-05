import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  userEmail: { presence: true, email: true, emailDomain: true },
  newPassword: { presence: true },
};

const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
