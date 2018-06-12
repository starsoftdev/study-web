import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  exposureLevel: { presence: true },
  campaignLength: { presence: true },
  condenseTwoWeeks: { presence: false },
  startDate: { presence: false },
  notes: { presence: false },
};

const renewStudyFields = Object.keys(schema);

export { renewStudyFields };

export default values => {
  const fieldValidator = validatorFactory(schema);
  const fieldErrors = fieldValidator(values);
  const mediaTypeErrors = [];

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
      ...fieldErrors,
      mediaType: mediaTypeErrors,
    };
  } else {
    return fieldErrors;
  }
};
