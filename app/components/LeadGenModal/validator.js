import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  facebookPageId: { presence: true },
  facebookPageToken: { presence: true },
  facebookFormName: { presence: true },
};

export default validatorFactory(schema);
