import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocolNumber: { presence: true },
  sponsorName: { presence: true },
  sponsorEmail: { email: true },
  recruitmentPhone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in the format of (123) 456-7890 or E.164 format phone numbers
      pattern: '^\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|\\+?[1-9]\\d{1,14}$',
      message: '^Invalid phone number',
    },
  },
};

const addProtocolFields = Object.keys(schema);

export { addProtocolFields };

export default validatorFactory(schema);
