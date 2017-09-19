import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  message: { presence: { message: '^Message is required.' } },
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
