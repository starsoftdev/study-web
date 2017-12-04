import { validate } from 'validate.js';

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

      // check for unique messagingNumber
      let isUnique = true;
      values.leadSource.forEach((leadInner, indexInner) => {
        if (indexInner !== index && leadInner.messagingNumber && lead.messagingNumber && leadInner.messagingNumber.value && lead.messagingNumber.value && leadInner.messagingNumber.value === lead.messagingNumber.value) {
          isUnique = false;
        }
      });
      let messagingNumberErrors = null;
      if (!isUnique) {
        messagingNumberErrors = { messagingNumber : ['Messaging Number should be unique'] };
      }

      if (!lead.source_id || !lead.source_name || messagingNumberErrors) {
        leadSourceErrors[index] = { ...leadError, ...messagingNumberErrors };
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
