import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  recruitmentPhone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: '^Invalid phone number',
    },
  },
};

const editStudyFields = Object.keys(schema);

export { editStudyFields };

export default values => {
  const fieldValidator = validatorFactory(schema);
  const fieldErrors = fieldValidator(values);
  const mediaTypeErrors = [];

  if (values.mediaType) {
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
