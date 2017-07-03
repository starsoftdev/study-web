import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  title: {
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
      // must be a phone in the format of (123) 456-7890 or E.164 format phone numbers
      pattern: '^\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4}|\\+?[1-9]\\d{1,14}$',
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
