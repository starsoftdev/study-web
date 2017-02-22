import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  postalCode: { presence: true },
};

export default validatorFactory(schema);
