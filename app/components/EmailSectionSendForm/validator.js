import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  message: { presence: { message: '^Error! Message is required.' } },
  email: {
    presence: {
      message: '^Error! Email is required.',
    },
    email: {
      message: '^Error! Invalid email.',
    },
  },
  subject: { presence: { message: '^Error! Subject is required.' } },
};

export default validatorFactory(schema);
