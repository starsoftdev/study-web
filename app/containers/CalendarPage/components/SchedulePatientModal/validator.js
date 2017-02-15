import { validatorFactory } from '../../../../utils/reduxForm';

const schema = {
  hour: { presence: true },
  minute: { presence: { message: 'You need to select minute' } },
  period: { presence: { message: 'You need to select period' } },
  siteLocation: { presence: { message: 'You need to select Site Location' } },
  protocol: { presence: { message: 'You need to select Protocol' } },
  patient: { presence: { message: 'You need to select Patient' } },
  textReminder: { presence: false },
};

const fields = Object.keys(schema);
export { fields };

export default validatorFactory(schema);
