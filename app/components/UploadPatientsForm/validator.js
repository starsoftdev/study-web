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
      message: '^Names can\'t be blank',
    },
  },
  groupemail: {
    presence: {
      message: '^Emails can\'t be blank',
    },
  },
  groupphone: {
    presence: {
      message: '^Phones can\'t be blank',
    },
  },
  groupage: { presence: false },
  groupgender: { presence: false },
  groupbmi: { presence: false },
};

const fields = Object.keys(schema);

export { fields };

export default validatorFactory(schema);
