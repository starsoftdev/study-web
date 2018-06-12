export default values => {
  const errors = {};
  const mediaTypeErrors = [];
  if (!values.level && !values.addPatientQualificationSuite && !values.callTracking) {
    errors.level = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.addPatientQualificationSuite = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
    errors.callTracking = 'You need to select either Upgrade Level, Patient Messaging Suite, or Patient Qualification Suite';
  }
  if (values.startDate) {
    if (!values.level) {
      errors.level = 'You need to select the Upgrade Level';
    }
    if (!values.campaignLength) {
      errors.campaignLength = 'You need to select the campaign length';
    }
  }

  if (values.callTracking && values.mediaType) {
    values.mediaType.forEach((lead, index) => {
      const leadError = {};

      if (!mediaType.source) {
        leadError.source = 'Lead source can\'t be blank';
      }
      if (!mediaType.sourceName) {
        leadError.sourceName = 'Lead source name can\'t be blank';
      }
      if (!mediaType.source || !mediaType.sourceName) {
        mediaTypeErrors[index] = leadError;
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
