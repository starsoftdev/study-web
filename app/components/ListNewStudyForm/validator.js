import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocolNumber: { presence: true },
  sponsorName: { presence: true },
  file: { validFile: ['images', 'pdf'] },
  sponsorEmail: { email: true, emailDomain: true },
  recruitmentPhone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: '^Invalid phone number',
    },
  },
  croContactEmail: { email: true, emailDomain: true },
  irbEmail: { email: true, emailDomain: true },
  exposureLevel: { presence: { message: '^You need to select exposure level' } },
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
