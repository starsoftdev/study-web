import { validatorFactory } from 'utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
