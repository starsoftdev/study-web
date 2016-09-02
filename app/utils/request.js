import 'whatwg-fetch';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const jwtToken = localStorage.getItem('jwtToken');

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (jwtToken) {
    headers.authorization = jwtToken;
  }

  headers.authorization = 'ltDVEqf99WNfKGxJeyl2hQnOGmXb0wUFbv4DBSVHCTKzFYZ7fxEn6Wv9Umnq8jc9';

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
  return response.json();
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
  } else { // eslint-disable-line 
    return response.json().then(err => {
      throw err;
    });
  }
}
