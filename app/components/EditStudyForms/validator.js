import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  recruitment_phone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in the format of (123) 456-7890 or E.164 format phone numbers
      pattern: '^\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|\\+?[1-9]\\d{1,14}$',
      message: '^Invalid phone number',
    },
  },
  site_address: { presence: true },
};

const editStudyFields = Object.keys(schema);

export { editStudyFields };

export default validatorFactory(schema);
