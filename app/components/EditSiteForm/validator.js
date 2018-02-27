import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  name: { presence: true },
  phoneNumber: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: '^Invalid phone number',
    },
  },
  address: { presence: true },
  city: { presence: true },
  countryCode: { presence: false },
  zip: { presence: true },
  selectedRegion: { presence: true },
  selectedTimezone: { presence: true },
};

const editStudyFields = Object.keys(schema);

export { editStudyFields };

export default validatorFactory(schema);
