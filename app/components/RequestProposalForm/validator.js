import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  site: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocol: { presence: true },
  sponsorEmail: { email: true, emailDomain: true },
  croEmail: { email: true, emailDomain: true },
  irbEmail: { email: true, emailDomain: true },
  level_id: { presence: { message: '^You need to select exposure level' } },
  campaignLength: { presence: { message: '^You need to select campaign length' } },
};
const fields = Object.keys(schema);

export { fields };
export default values => {
  const fieldValidator = validatorFactory(schema);
  const fieldErrors = fieldValidator(values);
  const leadSourceErrors = [];

  if (values.callTracking && values.leadSource) {
    values.leadSource.forEach((lead, index) => {
      const leadError = {};

      if (!lead.source_id) {
        leadError.source_id = 'Lead source can\'t be blank';
      }
      if (!lead.source_name) {
        leadError.source_name = 'Lead source name can\'t be blank';
      }
      if (!lead.source_id || !lead.source_name) {
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
// export default validatorFactory(schema);
