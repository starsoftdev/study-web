import { validatorFactory } from 'utils/reduxForm';

const schema = {
  level: { presence: true },
  patientMessagingSuite: { presence: false },
  callTracking: { presence: false },
  notes: { presence: false },
};

const upgradeStudyFields = Object.keys(schema);

export { upgradeStudyFields };

export default validatorFactory(schema);
