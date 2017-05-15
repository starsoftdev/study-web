import { validatorFactory } from '../../utils/reduxForm';

const schema = {
  site: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocol: { presence: true },
  sponsorEmail: { email: true, presence: true },
  croEmail: { email: true, presence: true },
  irbEmail: { email: true, presence: true },
  level_id: { presence: { message: '^You need to select exposure level' } },
  campaignLength: { presence: { message: '^You need to select campaign length' } },
  startDate: { presence: true },
};
const fields = Object.keys(schema);

export { fields };
export default validatorFactory(schema);
