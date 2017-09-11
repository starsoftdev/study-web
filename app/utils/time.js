import moment from 'moment-timezone';

export function getUTCTime(localTime, timezone) {
  return moment.tz(localTime, timezone).utc();
}
