import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  search: { presence: false },
  protocol: { presence: false },
  status: { presence: false },
};

export default validatorFactory(schema);
