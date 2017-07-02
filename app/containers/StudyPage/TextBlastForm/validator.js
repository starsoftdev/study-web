import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  message: { presence: { message: '^Message is required.' } },
  patients: { presence: { message: '^Error! No patients selected.' } },
};

export default validatorFactory(schema);
