import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  number: { presence: true },
};

export default validatorFactory(schema);
