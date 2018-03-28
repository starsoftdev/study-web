export default values => {
  const leadSourceErrors = [];
  const isUrlValid = (str) => { return /^\w+$/.test(str); };

  if (values.leadSource) {
    values.leadSource.forEach((lead, index) => {
      const leadError = {};

      if (!lead.source) {
        leadError.source = 'Lead source can\'t be blank';
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
      let urlErrors = null;
      let messagingNumberErrors = null;
      let googleUrlErrors = null;
      if (!isUnique) {
        messagingNumberErrors = { messagingNumber : ['Messaging Number should be unique'] };
      }
      if (!isGoogleUrlUnique) {
        googleUrlErrors = { googleUrl : ['Google Url should be unique'] };
      }

      if (lead.url && !isUrlValid(lead.url)) {
        urlErrors = { url : ['Url only allow letters and numbers'] };
      }

      if (!lead.source || !lead.source_name || messagingNumberErrors || googleUrlErrors || urlErrors) {
        leadSourceErrors[index] = { ...leadError, ...messagingNumberErrors, ...googleUrlErrors, ...urlErrors };
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
