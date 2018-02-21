/**
 * Created by mike on 10/16/16.
 */

import libPhoneNumber from 'google-libphonenumber';
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

export function normalizePhoneForServer(value) {
  if (!value) {
    return value;
  }
  // we remove any unneeded characters other than digits and the first +
  let onlyNums = value.replace(/[^\d+]+/g, '');
  try {
    // we return the international format of phone number using google-libphonenumber
    const phoneNumber = phoneUtil.parse(onlyNums, '');
    return phoneUtil.format(phoneNumber, PNF.INTERNATIONAL).replace(/[^\d+]+/g, '');
  } catch (err) { // google-libphonenumber throws an error if the number is not valid, we handle this case here
    onlyNums = value.replace(/[^\d]+/g, '');
    if (onlyNums.length <= 10) {
      return `+1${onlyNums}`;
    }
    return `+${onlyNums}`;
  }
}

export function normalizePhoneDisplay(value) {
  if (!value) {
    return value;
  }
  // we remove any unneeded characters other than digits and the first +
  let onlyNums = value.replace(/[^\d+]+/g, '');
  try {
    // we return the formatted phone number using google-libphonenumber
    return formatPhone(onlyNums);
  } catch (err) { // google-libphonenumber throws an error if the number is not valid, we handle this case here
    onlyNums = value.replace(/[^\d]+/g, '');
    if (onlyNums.length <= 10) {
      return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
    } else if (onlyNums.length === 11 && value.slice(0, 2) === '+1') {
      return `(${onlyNums.slice(1, 4)}) ${onlyNums.slice(4, 7)}-${onlyNums.slice(7, 11)}`;
    }
    return `+${onlyNums}`;
  }
}
