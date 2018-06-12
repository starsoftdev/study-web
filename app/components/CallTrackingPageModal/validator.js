export default values => {
  const mediaTypeErrors = [];
  const isUrlValid = (str) => { return /^\w+$/.test(str); };
  const isGUrlValid = (str) => { return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(str); };

  if (values.mediaType) {
    values.mediaType.forEach((lead, index) => {
      const leadError = {};

      if (!mediaType.source) {
        leadError.source = 'Lead source can\'t be blank';
      }
      if (!mediaType.sourceName) {
        leadError.sourceName = 'Lead source name can\'t be blank';
      }

      // check for unique messagingNumber
      let isUnique = true;
      let isGoogleUrlUnique = true;
      let isGoogleUrlValid = true;
      let isNameUnique = true;
      values.mediaType.forEach((leadInner, indexInner) => {
        if (indexInner !== index && leadInner.messagingNumber && mediaType.messagingNumber && leadInner.messagingNumber.value && mediaType.messagingNumber.value && leadInner.messagingNumber.value === mediaType.messagingNumber.value) {
          isUnique = false;
        }
        if (indexInner !== index && leadInner.url && mediaType.url && leadInner.url.toLowerCase() === mediaType.url.toLowerCase()) {
          isGoogleUrlUnique = false;
        }
        if (leadInner.googleUrl && !isGUrlValid(leadInner.googleUrl)) {
          isGoogleUrlValid = false;
        }
        if (indexInner !== index && leadInner.sourceName && mediaType.sourceName && leadInner.sourceName.toLowerCase() === mediaType.sourceName.toLowerCase()) {
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
      if (!isGoogleUrlValid) {
        googleUrlErrors = { googleUrl : ['Url should be correct format'] };
      }
      if (!isNameUnique) {
        sourceNameErrors = { sourceName : ['Source name should be unique'] };
      }
      if (mediaType.url && !isUrlValid(mediaType.url)) {
        urlErrors = { url : ['Url only allow letters and numbers'] };
      }

      if (!mediaType.source || !mediaType.sourceName || messagingNumberErrors || googleUrlErrors || urlErrors || sourceNameErrors) {
        mediaTypeErrors[index] = { ...leadError, ...messagingNumberErrors, ...googleUrlErrors, ...urlErrors, ...sourceNameErrors };
      }
    });
  }

  if (mediaTypeErrors && mediaTypeErrors.length > 0) {
    return {
      mediaType: mediaTypeErrors,
    };
  } else {
    return [];
  }
};