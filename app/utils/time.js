import moment from 'moment-timezone';

export function getUTCTime(localTime, timezone) {
  return moment.tz(localTime, timezone).utc();
}

export function formatTimezone(timezone, city) {
  if (timezone.indexOf('(UTC') > -1) {
    return timezone;
  }

  if (moment.tz.zone(timezone)) {
    const zoneAbb = moment().tz(timezone).zoneAbbr();
    return `(${zoneAbb}) ${city || ''}`;
  }

  return '(UTC-04) New York, America';
}

export function parseTimezone(timezone) {
  const regionArea = timezone.split(') ')[1];
  const city = regionArea.split(', ')[0].replace(' ', '_');
  const region = regionArea.split(', ')[1];

  return `${region}/${city}`;
}
