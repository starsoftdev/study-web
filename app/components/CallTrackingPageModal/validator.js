export default values => {
  const mediaTypeErrors = [];
  const isUrlValid = (str) => { return /^\w+$/.test(str); };
  const isGUrlValid = (str) => { return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(str); };

  if (values.mediaType) {
    values.mediaType.forEach((mediaType, index) => {
      const mediaTypeError = {};

      if (!mediaType.source) {
        mediaTypeError.source = 'Media Type can\'t be blank';
      }
      if (!mediaType.sourceName) {
        mediaTypeError.sourceName = 'Media Type can\'t be blank';
      }

      // check for unique messagingNumber
      let isUnique = true;
      let isGoogleUrlUnique = true;
      let isGoogleUrlValid = true;
      let isNameUnique = true;
      values.mediaType.forEach((mediaTypeInner, indexInner) => {
        if (indexInner !== index && mediaTypeInner.messagingNumber && mediaType.messagingNumber && mediaTypeInner.messagingNumber.value && mediaType.messagingNumber.value && mediaTypeInner.messagingNumber.value === mediaType.messagingNumber.value) {
          isUnique = false;
        }
        if (indexInner !== index && mediaTypeInner.url && mediaType.url && mediaTypeInner.url.toLowerCase() === mediaType.url.toLowerCase()) {
          isGoogleUrlUnique = false;
        }
        if (mediaTypeInner.googleUrl && !isGUrlValid(mediaTypeInner.googleUrl)) {
          isGoogleUrlValid = false;
        }
        if (indexInner !== index && mediaTypeInner.sourceName && mediaType.sourceName && mediaTypeInner.sourceName.toLowerCase() === mediaType.sourceName.toLowerCase()) {
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
        mediaTypeErrors[index] = { ...mediaTypeError, ...messagingNumberErrors, ...googleUrlErrors, ...urlErrors, ...sourceNameErrors };
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
