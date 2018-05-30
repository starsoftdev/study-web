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

export function getMomentFromDate(date, tz = null) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  if (tz) {
    return moment.tz(`${year}-${month}-${day}`, tz).startOf('date');
  }
  return moment(`${year}-${month}-${day}`);
}
