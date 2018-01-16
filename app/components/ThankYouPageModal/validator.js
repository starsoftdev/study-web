import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  thankyouFor: {
    presence: false,
  },
  youWillBe: {
    presence: false,
  },
  herIsThe: {
    presence: false,
  },
  lookingForwardText: {
    presence: false,
  },
  isHideLocationData: {
    presence: false,
  },
  isShareLocation: {
    presence: false,
  },
  isSharePhone: {
    presence: false,
  },
  visitOurWebsiteText: {
    presence: false,
  },
  websiteLink: {
    presence: false,
    url: true,
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
