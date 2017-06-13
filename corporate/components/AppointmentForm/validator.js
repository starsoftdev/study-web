import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  date: { presence: true },
  time: { presence: true },
};

export default validatorFactory(schema);
