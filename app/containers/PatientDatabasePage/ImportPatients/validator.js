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
    presence: {
      message: '^Email cannot be blank',
    },
    email: {
      message: '^Email not valid',
    },
    emailDomain : {
      message: '^Invalid Email domain',
    },
  },
  protocol: {
    presence: true,
  },
  indication: {
    presence: false,
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
  site: {
    presence: true,
  },
  source: {
    presence: true,
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
