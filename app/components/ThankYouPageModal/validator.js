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
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
