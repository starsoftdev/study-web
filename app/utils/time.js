import moment from 'moment';

export function getLocalTime(utcTime, timezone) {
  return moment(utcTime).tz(timezone);
}

export function getUTCTime(localTime, timezone) {
  return moment.tz(localTime, timezone).utc();
}