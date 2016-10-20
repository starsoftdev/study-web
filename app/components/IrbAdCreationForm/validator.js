import { validatorFactory } from 'utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  irbName: { presence: true },
  irbEmail: { email: true },
  compensationAmount: { presence: true, numericality: true },
};

export default validatorFactory(schema);
