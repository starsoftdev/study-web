import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocolNumber: { presence: true },
  sponsorName: { presence: true },
  file: {
    validFile: {
      allowedFileTypes: ['images', 'pdf'],
      message: 'The selected file is in the wrong format.',
    },
  },
  sponsorEmail: { email: true, emailDomain: true },
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
  croContactEmail: { email: true, emailDomain: true },
  irbEmail: { email: true, emailDomain: true },
  exposureLevel: { presence: { message: '^You need to select exposure level' } },
  campaignLength: { presence: { message: '^You need to select campaign length' } },
};
const fields = Object.keys(schema);

export { fields };
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
