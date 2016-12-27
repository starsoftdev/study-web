import { validatorFactory } from 'utils/reduxForm';

const schema = {
  hour: { presence: { message: 'You need to select hour' } },
  minute: { presence: { message: 'You need to select minute' } },
  period: { presence: { message: 'You need to select period' } },
  textReminder: { presence: false },
};

const fields = Object.keys(schema);
export { fields };

export default validatorFactory(schema);
