import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  site: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocol: { presence: true },
  sponsorEmail: { email: true, emailDomain: true },
  croEmail: { email: true, emailDomain: true },
  irbEmail: { email: true, emailDomain: true },
  level_id: { presence: { message: '^You need to select exposure level' } },
  campaignLength: { presence: { message: '^You need to select campaign length' } },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
