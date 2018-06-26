const rp = require('request-promise');
const API_URL = process.env.API_URL;

const fetchLanding = (landingId) => {
  return rp({
    uri: `${API_URL}/landingPages/${landingId}/fetchLanding`,
    json: true,
    rejectUnauthorized: process.env.NODE_ENV !== 'development',
  });
};

module.exports = {
  fetchLanding,
};
