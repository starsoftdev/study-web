import 'whatwg-fetch';
import { pick } from 'lodash';

import { getItem } from 'utils/localStorage';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const authToken = getItem('auth_token');

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.authorization = authToken;
  }

  // Use authorization token temporarily until we write auth module.
  // headers.authorization = 'ltDVEqf99WNfKGxJeyl2hQnOGmXb0wUFbv4DBSVHCTKzFYZ7fxEn6Wv9Umnq8jc9';

  options.headers = Object.assign({}, options.headers, headers); // eslint-disable-line 

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => data);
  // .catch((err) => err);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status !== 204) { // do not try to parse empty response
    return response.json();
  }
  return true;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {objct} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

function checkStatus(response) {
  if (response.ok) { // response.status >= 200 && response.status < 300
    return response;
  }

  // details from `whatwg-fetch`
  const err = pick(response, ['status', 'statusText']);

  return response.json()
    .then(json => {
      // details from actual error response
      throw Object.assign(err, pick(json.error, ['code', 'message', 'status']));
    }, () => {
      throw Object.assign(err, { message: 'Failed to parse JSON' });
    });
}
