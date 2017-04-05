import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  name: { presence: true },
  piFirstName: { presence: true },
  piLastName: { presence: true },
  phone: { presence: true },
  address: { presence: true },
  city: { presence: true },
  state: { presence: true },
  zip: { presence: true },
  selectedRegion: { presence: true },
  selectedTimezone: { presence: true },
};

export default validatorFactory(schema);
