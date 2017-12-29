import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  address: { presence: true },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
