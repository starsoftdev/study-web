import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  description: {
    presence: false,
  },
  instructions: {
    presence: false,
  },
  fullNamePlaceholder: {
    presence: true,
  },
  emailPlaceholder: {
    presence: true,
  },
  phonePlaceholder: {
    presence: true,
  },
  signupButtonText: {
    presence: false,
  },
  clickToCallButtonText: {
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
