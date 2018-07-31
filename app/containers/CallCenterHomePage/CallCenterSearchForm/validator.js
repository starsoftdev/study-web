import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  phone: {
    presence: true,
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: '^Invalid phone number',
    },
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
