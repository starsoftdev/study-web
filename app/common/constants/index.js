export const LEAD_SOURCE_LIST = [
  { value: 1, label: 'TV' },
  { value: 2, label: 'Radio' },
  { value: 3, label: 'Print' },
  { value: 4, label: 'Digital' },
  { value: 5, label: 'Other' },
];

export const CAMPAIGN_LENGTH_LIST = [
  { value: 1, label: '1 Month' },
  { value: 2, label: '2 Months' },
  { value: 3, label: '3 Months' },
  { value: 4, label: '4 Months' },
  { value: 5, label: '5 Months' },
  { value: 6, label: '6 Months' },
  { value: 7, label: '7 Months' },
  { value: 8, label: '8 Months' },
  { value: 9, label: '9 Months' },
  { value: 10, label: '10 Months' },
  { value: 11, label: '11 Months' },
  { value: 12, label: '12 Months' },
];


export const Currencies = {
  USD: 'USD',
  CAD: 'CAD',
};

export const MESSAGING_SUITE_PRICE = 24700;
export const QUALIFICATION_SUITE_PRICE = 84900;
export const CALL_TRACKING_PRICE = 24700;
export const QUALIFICATION_SUITE_UPGRADE_PRICE = QUALIFICATION_SUITE_PRICE - MESSAGING_SUITE_PRICE;

export const MONTH_OPTIONS = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 },
];

const thisYear = new Date().getFullYear();
export const YEAR_OPTIONS = [
  { label: thisYear.toString(), value: thisYear },
  { label: (thisYear + 1).toString(), value: thisYear + 1 },
  { label: (thisYear + 2).toString(), value: thisYear + 2 },
];

export const SchedulePatientModalType = {
  CREATE: 'CREATE',
  UPDATED: 'UPDATE',
  HIDDEN: 'HIDDEN',
};

export const HOUR_OPTIONS = [
  { label: '01', value: 1 },
  { label: '02', value: 2 },
  { label: '03', value: 3 },
  { label: '04', value: 4 },
  { label: '05', value: 5 },
  { label: '06', value: 6 },
  { label: '07', value: 7 },
  { label: '08', value: 8 },
  { label: '09', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
];

export const MINUTES_OPTIONS = [
  { label: '00', value: '00' },
  { label: '01', value: 1 },
  { label: '02', value: 2 },
  { label: '03', value: 3 },
  { label: '04', value: 4 },
  { label: '05', value: 5 },
  { label: '06', value: 6 },
  { label: '07', value: 7 },
  { label: '08', value: 8 },
  { label: '09', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
  { label: '17', value: 17 },
  { label: '18', value: 18 },
  { label: '19', value: 19 },
  { label: '20', value: 20 },
  { label: '21', value: 21 },
  { label: '22', value: 22 },
  { label: '23', value: 23 },
  { label: '24', value: 24 },
  { label: '25', value: 25 },
  { label: '26', value: 26 },
  { label: '27', value: 27 },
  { label: '28', value: 28 },
  { label: '29', value: 29 },
  { label: '30', value: 30 },
  { label: '31', value: 31 },
  { label: '32', value: 32 },
  { label: '33', value: 33 },
  { label: '34', value: 34 },
  { label: '35', value: 35 },
  { label: '36', value: 36 },
  { label: '37', value: 37 },
  { label: '38', value: 38 },
  { label: '39', value: 39 },
  { label: '40', value: 40 },
  { label: '41', value: 41 },
  { label: '42', value: 42 },
  { label: '43', value: 43 },
  { label: '44', value: 44 },
  { label: '45', value: 45 },
  { label: '46', value: 46 },
  { label: '47', value: 47 },
  { label: '48', value: 48 },
  { label: '49', value: 49 },
  { label: '50', value: 50 },
  { label: '51', value: 51 },
  { label: '52', value: 52 },
  { label: '53', value: 53 },
  { label: '54', value: 54 },
  { label: '55', value: 55 },
  { label: '56', value: 56 },
  { label: '57', value: 57 },
  { label: '58', value: 58 },
  { label: '59', value: 59 },
];

export const AM_PM_OPTIONS = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];
