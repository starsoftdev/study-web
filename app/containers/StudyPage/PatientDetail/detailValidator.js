import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  firstName: {
    presence: {
      message: '^First name cannot be blank',
    },
  },
  lastName: {
    presence: {
      message: '^Last name cannot be blank',
    },
  },
  email: {
    email: {
      message: '^Email not valid',
    },
    emailDomain : {
      message: '^Invalid Email domain',
    },
  },
  phone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: 'Invalid phone number',
    },
  },
};

export default validatorFactory(schema);
