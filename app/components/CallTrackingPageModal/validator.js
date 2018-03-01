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
      let isGoogleUrlUnique = true;
      values.leadSource.forEach((leadInner, indexInner) => {
        if (indexInner !== index && leadInner.messagingNumber && lead.messagingNumber && leadInner.messagingNumber.value && lead.messagingNumber.value && leadInner.messagingNumber.value === lead.messagingNumber.value) {
          isUnique = false;
        }
        if (indexInner !== index && leadInner.googleUrl && lead.googleUrl && leadInner.googleUrl === lead.googleUrl) {
          isGoogleUrlUnique = false;
        }
      });
      let messagingNumberErrors = null;
      let googleUrlErrors = null;
      if (!isUnique) {
        messagingNumberErrors = { messagingNumber : ['Messaging Number should be unique'] };
      }
      if (!isGoogleUrlUnique) {
        googleUrlErrors = { googleUrl : ['Google Url should be unique'] };
      }

      if (!lead.source_id || !lead.source_name || messagingNumberErrors || googleUrlErrors) {
        leadSourceErrors[index] = { ...leadError, ...messagingNumberErrors, ...googleUrlErrors };
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
