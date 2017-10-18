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
    presence: {
      message: '^Error! Name field is required.',
    },
  },
  groupemail: {
    presence: {
      message: '^Error! Email field is required.',
    },
  },
  groupphone: {
    presence: {
      message: '^Error! Phone field is required.',
    },
  },
  groupage: { presence: false },
  groupgender: { presence: false },
  groupbmi: { presence: false },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
