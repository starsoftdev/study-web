import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  message: { presence: { message: '^Message is required.' } },
  from: { presence: { message: '^From email address is required.' } },
  subject: { presence: { message: '^Subject is required.' } },
  patients: { presence: { message: '^Error! No patients selected.' } },
};

export default validatorFactory(schema);
