import { validatorFactory } from '../../../../common/utils/reduxForm';

const schema = {
  vendorName: { presence: true },
  firstName: { presence: true },
  lastName: { presence: true },
  email: { presence: true, email: true },
};

export default validatorFactory(schema);
