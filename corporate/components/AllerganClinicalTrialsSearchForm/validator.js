import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  postalCode: { presence: false },
  distance: { presence: false },
  indicationId: { presence: false },
};

export default validatorFactory(schema);
