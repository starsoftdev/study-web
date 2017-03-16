import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  quantity: { presence: false },
  credits: { presence: false },
  price: { presence: false },
};
const addCreditsFields = Object.keys(schema);

export { addCreditsFields };

export default validatorFactory(schema);
