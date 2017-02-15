import { validatorFactory } from '../../../utils/reduxForm';

const schema = {
  exposureLevel: { presence: true },
  campaignLength: { presence: true },
  condenseTwoWeeks: { presence: false },
  patientMessagingSuite: { presence: false },
  callTracking: { presence: false },
  startDate: { presence: true },
  notes: { presence: false },
};

const renewStudyFields = Object.keys(schema);

export { renewStudyFields };

export default validatorFactory(schema);
