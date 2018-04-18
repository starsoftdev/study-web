/**
 * Created by mike on 10/16/16.
 */

import libPhoneNumber from 'google-libphonenumber';
import _ from 'lodash';
import * as postalCodePattern from './postalCodePattern.json';

const PNF = libPhoneNumber.PhoneNumberFormat;
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

export function formatPhone(phone) {
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

export function normalizePhoneForServer(value, code = null) {
  if (!value) {
    return value;
  }
  // we remove any unneeded characters other than digits and the first +
  let onlyNums = value.replace(/[^\d+]+/g, '');
  try {
    // we return the international format of phone number using google-libphonenumber
    const phoneWithCode = (code) ? `${code}${onlyNums}` : onlyNums;
    const phoneNumber = phoneUtil.parse(phoneWithCode, '');
    return phoneUtil.format(phoneNumber, PNF.INTERNATIONAL).replace(/[^\d+]+/g, '');
  } catch (err) { // google-libphonenumber throws an error if the number is not valid, we handle this case here
    onlyNums = value.replace(/[^\d]+/g, '');
    if (onlyNums.length <= 10 && !code) {
      return `+1${onlyNums}`;
    }
    return (code) ? `${code}${onlyNums}` : `+${onlyNums}`;
  }
}

export function normalizePhoneDisplay(value, data = null) {
  if (!value) {
    return value;
  }
  if (data && `+${data.dialCode}` === value) {
    return `+${data.dialCode}`;
  }
  // we remove any unneeded characters other than digits and the first +
  let onlyNums = value.replace(/[^\d+]+/g, '');
  try {
    // we return the formatted phone number using google-libphonenumber
    return formatPhone(onlyNums);
  } catch (err) { // google-libphonenumber throws an error if the number is not valid, we handle this case here
    onlyNums = value.replace(/[^\d]+/g, '');
    if (onlyNums.length <= 10 && !data) {
      return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
    } else if (onlyNums.length === 11 && value.slice(0, 2) === '+1' && !data) {
      return `(${onlyNums.slice(1, 4)}) ${onlyNums.slice(4, 7)}-${onlyNums.slice(7, 11)}`;
    }
    return (data) ? onlyNums : `+${onlyNums}`;
  }
}

export function getPostalCodePattern(countryCode) {
  const foundCountry = _.find(postalCodePattern, ['abbreviation', countryCode.toUpperCase()]);
  if (foundCountry) {
    return foundCountry.regex;
  }
  return '';
}
