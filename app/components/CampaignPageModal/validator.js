import { validatorFactory } from '../../../app/utils/reduxForm';

const schema = {
  campaignDatefrom: {
    presence: false,
  },
  campaignDateto: {
    presence: false,
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
