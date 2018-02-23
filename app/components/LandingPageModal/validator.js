import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  title: {
    presence: false,
  },
  locationMask: {
    presence: false,
  },
  description: {
    presence: false,
  },
  instructions: {
    presence: false,
  },
  fullNamePlaceholder: {
    presence: false,
  },
  emailPlaceholder: {
    presence: false,
  },
  phonePlaceholder: {
    presence: false,
  },
  signupButtonText: {
    presence: false,
  },
  clickToCallButtonText: {
    presence: false,
  },
  hideClickToCall: {
    presence: false,
  },
  clickToCallButtonNumber: {
    presence: false,
    format: {
      // must be a phone in a valid format
      pattern: /^(?:(\+?\d{1,3}) ?)?(?:([\(]?\d+[\)]?)[ -])?(\d{1,5}[\- ]?\d{1,5})$/,
      message: 'Invalid phone number',
    },
  },
  ifInterestedInstructions: {
    presence: false,
  },
  bySignUpText: {
    presence: false,
  },
  shareThisStudyText: {
    presence: false,
  },
  displayAlways: {
    presence: false,
  },
  showSocialMediaButtons: {
    presence: false,
  },
  initialMessageText: {
    presence: false,
  },
  facebookUrl: {
    presence: false,
    url: true,
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
