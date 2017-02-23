import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  postalCode: { presence: false },
  distance: { presence: false },
  indication_id: { presence: false },
};

export default validatorFactory(schema);
