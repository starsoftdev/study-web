import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  email: { presence: true, email: true, emailDomain: true },
  phone: {
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: 'Invalid phone number',
    },
  },
  role: { presence: true },
};

export default validatorFactory(schema);
