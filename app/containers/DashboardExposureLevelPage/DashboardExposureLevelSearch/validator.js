import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  name: { presence: true },
  price: { presence: true },
  position: { presence: true },
};

export default validatorFactory(schema);
