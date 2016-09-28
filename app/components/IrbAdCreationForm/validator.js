import { validatorFactory } from 'utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication: { presence: { message: '^You need to select indication' } },
};

export default validatorFactory(schema);
