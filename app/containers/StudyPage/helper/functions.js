/**
 * Created by mike on 10/16/16.
 */

import libPhoneNumber from 'google-libphonenumber';
const PNF = libPhoneNumber.PhoneNumberFormat;
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

export function formatPhone(phone) {
  let patientPhone
  const phoneNumber = phoneUtil.parse(phone, '');
  const countryCode = phoneNumber.getCountryCode();
  if (countryCode === 1) {
    patientPhone = phoneUtil.format(phoneNumber, PNF.NATIONAL);
  } else {
    patientPhone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
  }
  return patientPhone;
}