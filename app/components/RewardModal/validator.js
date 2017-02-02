import { validatorFactory } from 'utils/reduxForm';

const schema = {
  siteId: { presence: true },
  redemptionType: { presence: { message: '^You need to select redemption type' } },
};

export default validatorFactory(schema);
