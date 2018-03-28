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
      let isNameUnique = true;
      values.leadSource.forEach((leadInner, indexInner) => {
        if (indexInner !== index && leadInner.messagingNumber && lead.messagingNumber && leadInner.messagingNumber.value && lead.messagingNumber.value && leadInner.messagingNumber.value === lead.messagingNumber.value) {
          isUnique = false;
        }
        if (indexInner !== index && leadInner.url && lead.url && leadInner.url === lead.url) {
          isGoogleUrlUnique = false;
        }
        if (indexInner !== index && leadInner.source_name && lead.source_name && leadInner.source_name === lead.source_name) {
          isNameUnique = false;
        }
      });
      let urlErrors = null;
      let messagingNumberErrors = null;
      let googleUrlErrors = null;
      let sourceNameErrors = null;
      if (!isUnique) {
        messagingNumberErrors = { messagingNumber : ['Messaging Number should be unique'] };
      }
      if (!isGoogleUrlUnique) {
        googleUrlErrors = { url : ['Url should be unique'] };
      }
      if (!isNameUnique) {
        sourceNameErrors = { source_name : ['Source name should be unique'] };
      }
      if (lead.url && !isUrlValid(lead.url)) {
        urlErrors = { url : ['Url only allow letters and numbers'] };
      }

      if (!lead.source || !lead.source_name || messagingNumberErrors || googleUrlErrors || urlErrors || sourceNameErrors) {
        leadSourceErrors[index] = { ...leadError, ...messagingNumberErrors, ...googleUrlErrors, ...urlErrors, ...sourceNameErrors };
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
