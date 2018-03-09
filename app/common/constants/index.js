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

export const QUALIFICATION_SUITE_PRICE = 89700;
export const CALL_TRACKING_PRICE = 24700;

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
  { label: (thisYear + 3).toString(), value: thisYear + 3 },
  { label: (thisYear + 4).toString(), value: thisYear + 4 },
  { label: (thisYear + 5).toString(), value: thisYear + 5 },
  { label: (thisYear + 6).toString(), value: thisYear + 6 },
  { label: (thisYear + 7).toString(), value: thisYear + 7 },
  { label: (thisYear + 8).toString(), value: thisYear + 8 },
  { label: (thisYear + 9).toString(), value: thisYear + 9 },
  { label: (thisYear + 10).toString(), value: thisYear + 10 },
];

export const SchedulePatientModalType = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  HIDDEN: 'HIDDEN',
};
