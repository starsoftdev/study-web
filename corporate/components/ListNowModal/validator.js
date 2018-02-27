import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  name: {
    presence: {
      message: '^Name cannot be blank',
    },
  },
  company: {
    presence: {
      message: '^Company cannot be blank',
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

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
