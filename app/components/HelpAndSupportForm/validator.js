import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  email: { presence: true, email: true },
  firstName: { presence: true },
  lastName: { presence: true },
  message: { presence: true },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
