import { validate } from 'validate.js';

const recruitmentPhoneSchema = {
  recruitmentPhone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in the format of (123) 456-7890 or E.164 format phone numbers
      pattern: '^\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|\\+?[1-9]\\d{1,14}$',
      message: '^Invalid phone number',
    },
  },
};

export default values => {
  const leadSourceErrors = [];

  if (values.leadSource) {
    values.leadSource.forEach((lead, index) => {
      const leadError = {};

      if (!lead.source_id) {
        leadError.source_id = 'Lead source can\'t be blank';
      }
      if (!lead.source_name) {
        leadError.source_name = 'Lead source name can\'t be blank';
      }
      const reqPhoneErrors = validate({ recruitmentPhone: lead.recruitmentPhone }, recruitmentPhoneSchema);

      // check for unique messagingNumber
      let isUnique = true;
      values.leadSource.forEach((leadInner, indexInner) => {
        if (indexInner !== index && leadInner.messagingNumber && lead.messagingNumber && leadInner.messagingNumber.value === lead.messagingNumber.value) {
          isUnique = false;
        }
      });
      let messagingNumberErrors = null;
      if (!isUnique) {
        messagingNumberErrors = { messagingNumber : ['Messaging Number should be unique'] };
      }

      if (!lead.source_id || !lead.source_name || reqPhoneErrors || messagingNumberErrors) {
        leadSourceErrors[index] = { ...leadError, ...reqPhoneErrors, ...messagingNumberErrors };
      }
    });
  }

  if (leadSourceErrors && leadSourceErrors.length > 0) {
    return {
      leadSource: leadSourceErrors,
    };
  } else {
    return [];
  }
};

// export default validatorFactory(schema);
