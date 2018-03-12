import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  irbEmail: { email: true, emailDomain: true },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
