import moment from 'moment-timezone';

export function getUTCTime(localTime, timezone) {
  return moment.tz(localTime, timezone).utc();
}

export function formatTimezone(timezone) {
  if (timezone.indexOf('(UTC') > -1) {
    return timezone;
  }

  if (moment().tz(timezone).isValid) {
    const t = moment().tz(timezone).format('Z').split(':')[0];
    const parts = timezone.split('/');
    const region = parts[0];
    const city = parts.length > 1 ? parts[1].replace('_', ' ') : '';
    return `(UTC${t}) ${city}, ${region}`;
  }

  return '(UTC-04) New York, America';
}

export function parseTimezone(timezone) {
  const regionArea = timezone.split(') ')[1];
  const city = regionArea.split(', ')[0].replace(' ', '_');
  const region = regionArea.split(', ')[1];

  return `${region}/${city}`;
}
