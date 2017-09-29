import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  indication: {
    presence: true,
  },
  site: {
    presence: true,
  },
  source: {
    presence: true,
  },
  'group-name': {
    presence: { message: '^Name column can\'t be blank' },
  },
  'group-email': {
    presence: { message: '^Email column can\'t be blank' },
  },
  'group-phone': {
    presence: { message: '^Phone column can\'t be blank' },
  },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
