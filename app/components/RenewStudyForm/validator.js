import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  exposureLevel: { presence: true },
  campaignLength: { presence: true },
  condenseTwoWeeks: { presence: false },
  startDate: { presence: false },
  notes: { presence: false },
};

const renewStudyFields = Object.keys(schema);

export { renewStudyFields };

export default values => {
  const fieldValidator = validatorFactory(schema);
  const fieldErrors = fieldValidator(values);
  const leadSourceErrors = [];

  if (values.callTracking && values.leadSource) {
    values.leadSource.forEach((lead, index) => {
      const leadError = {};

      if (!lead.source) {
        leadError.source = 'Lead source can\'t be blank';
      }
      if (!lead.source_name) {
        leadError.source_name = 'Lead source name can\'t be blank';
      }
      if (!lead.source || !lead.source_name) {
        leadSourceErrors[index] = leadError;
      }
    });
  }

  if (leadSourceErrors && leadSourceErrors.length > 0) {
    return {
      ...fieldErrors,
      leadSource: leadSourceErrors,
    };
  } else {
    return fieldErrors;
  }
};
