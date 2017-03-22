import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
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
  isHideClickToCallButton: {
    presence: false,
  },
  clickToCallButtonNumber: {
    presence: false,
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
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
