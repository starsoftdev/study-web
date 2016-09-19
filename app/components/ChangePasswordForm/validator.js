import { validatorFactory } from 'utils/reduxForm';

const schema = {
  old_password: { presence: true },
  new_password: { presence: true },
  new_password_confirm: { presence: true },
  user_id: { presence: true },
};

export default validatorFactory(schema);
