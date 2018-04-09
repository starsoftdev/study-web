import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  name: {
    presence: {
      message: '^Name cannot be blank.',
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
  code: {
    presence: false,
  },
  phone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in a valid format
      // pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      pattern: /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/,
      message: '^Invalid phone number',
    },
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
