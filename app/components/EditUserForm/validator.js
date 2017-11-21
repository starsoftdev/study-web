import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  email: { presence: true, email: true, emailDomain: true },
  site: { presence: true },
  canPurchase: { presence: false },
  canRedeemRewards: { presence: false },
};

export default validatorFactory(schema);
