import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  patients: { presence: { message: '^Error! No patients selected.' } },
  email: {
    presence: {
      message: '^Email cannot be blank',
    },
    email: {
      message: '^Email not valid',
    },
  },
  subject: { presence: { message: '^Subject is required.' } },
};

export default validatorFactory(schema);
