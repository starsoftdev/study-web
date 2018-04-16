import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  distance: { presence: false },
  indicationId: { presence: false },
};

export default validatorFactory(schema);
