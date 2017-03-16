import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteId: { presence: { message: '^You need to select site location' } },
  redemptionType: { presence: { message: '^You need to select redemption type' } },
};

export default validatorFactory(schema);
