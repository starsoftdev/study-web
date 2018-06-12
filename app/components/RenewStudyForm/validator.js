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
      ...fieldErrors,
      mediaType: mediaTypeErrors,
    };
  } else {
    return fieldErrors;
  }
};
