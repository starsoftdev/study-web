import { validatorFactory } from '../../../../common/utils/reduxForm';

const schema = {
  name: { presence: false },
  site: { presence: false },
  status: { presence: false },
};

export default validatorFactory(schema);
