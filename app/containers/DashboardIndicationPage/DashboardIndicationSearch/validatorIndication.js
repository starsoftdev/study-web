import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  name: { presence: true },
  tier: { presence: true },
  Bronze: { presence: true },
  Silver: { presence: true },
  Gold: { presence: true },
  Platinum: { presence: true },
  Diamond: { presence: true },
  Ruby: { presence: true },
};

export default validatorFactory(schema);
