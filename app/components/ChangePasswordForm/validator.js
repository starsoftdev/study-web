import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  old_password: { presence: true },
  new_password: {
    presence: {
      message: '^New password cannot be blank',
    },
  },
  new_password_confirm: {
    presence: true,
    equality: {
      attribute: 'new_password',
      message: '^Passwords don\'t match!',
    },
  },
  user_id: { presence: true },
};

export default validatorFactory(schema);
