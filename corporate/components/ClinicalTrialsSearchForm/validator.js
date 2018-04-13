import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  postalCode: {
    presence: false,
    format: (value, attributes) => {
      if (attributes.countryCode && attributes.countryCode !== 'us') {
        return null;
      }
      if ((/^\d{5}(?:[-\s]\d{4})?$/).test(value)) {
        return null;
      }
      return 'Invalid zip code';
    },
  },
  distance: { presence: false },
  indication_id: { presence: false },
};

export default validatorFactory(schema);
