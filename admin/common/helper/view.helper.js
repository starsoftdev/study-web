/**
 * View compatible lib can run on both server and client code using common-js.
 */

const libPhoneNumber = require('google-libphonenumber');
const Remarkable = require('remarkable');

const PNF = libPhoneNumber.PhoneNumberFormat;
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
const md = new Remarkable();
md.set({
  html: true,
  breaks: true,
});

/**
 * Format phone number into national or international format
 *
 * @param {String} phone
 * @returns {String}
 */
function formatPhone(phone) {
  let patientPhone;
  const phoneNumber = phoneUtil.parse(phone, '');
  const countryCode = phoneNumber.getCountryCode();
  if (countryCode === 1) {
    patientPhone = phoneUtil.format(phoneNumber, PNF.NATIONAL);
  } else {
    patientPhone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
  }
  return patientPhone;
}

/**
 * Return phone number in format which is suitable for server processing.
 *
 * @param {String} value
 * @returns {String}
 */
function normalizePhoneForServer(value) {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]+/g, '');
  if (onlyNums.length <= 10) {
    return `+1${onlyNums}`;
  }
  return `+${onlyNums}`;
}

/**
 * Return phone number for good display.
 *
 * @param {String} value Phone number needs to be normalized
 * @returns {String} Normalized phone number string
 */
function normalizePhoneDisplay(value) {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]+/g, '');
  if (onlyNums.length <= 10) {
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
  } else if (onlyNums.length === 11 && value.slice(0, 2) === '+1') {
    return `(${onlyNums.slice(1, 4)}) ${onlyNums.slice(4, 7)}-${onlyNums.slice(7, 11)}`;
  }
  return `+${onlyNums}`;
}

/**
 * Render a string of HTML with the given markdown-complaint string.
 *
 * @param {String} str Input string with markdown syntax
 * @returns {String}
 */
function renderMarkdown(str) {
  return md.render(str);
}

module.exports = {
  formatPhone,
  normalizePhoneForServer,
  normalizePhoneDisplay,
  renderMarkdown,
};
