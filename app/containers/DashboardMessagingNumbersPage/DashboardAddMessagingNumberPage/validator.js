import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  country: { presence: true },
  areaCode: { presence: false },
};

export default validatorFactory(schema);
