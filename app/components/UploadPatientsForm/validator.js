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
  groupname: {
    presence: true,
  },
  groupemail: {
    presence: true,
  },
  groupphone: {
    presence: true,
  },
  groupage: { presence: false },
  groupgender: { presence: false },
  groupbmi: { presence: false },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
