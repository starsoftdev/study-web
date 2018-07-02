export default values => {
  const errors = {};
  const mediaTypeErrors = [];
  if (!values.level && !values.addPatientQualificationSuite && !values.mediaTracking) {
    errors.level = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.addPatientQualificationSuite = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.mediaTracking = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
  }
  if (values.startDate) {
    if (!values.level) {
      errors.level = 'You need to select the Upgrade Level';
    }
    if (!values.campaignLength) {
      errors.campaignLength = 'You need to select the campaign length';
    }
  }

  if (values.mediaTracking && values.mediaType) {
    values.mediaType.forEach((mediaType, index) => {
      const mediaTypeError = {};

      if (!mediaType.source) {
        mediaTypeError.source = 'Media Type can\'t be blank';
      }
      if (!mediaType.sourceName) {
        mediaTypeError.sourceName = 'Media Type can\'t be blank';
      }
      if (!mediaType.source || !mediaType.sourceName) {
        mediaTypeErrors[index] = mediaTypeError;
      }
    });
  }

  if (mediaTypeErrors && mediaTypeErrors.length > 0) {
    return {
      ...errors,
      mediaType: mediaTypeErrors,
    };
  } else {
    return errors;
  }
};
