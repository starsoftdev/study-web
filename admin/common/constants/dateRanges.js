import { createStaticRanges } from 'react-date-range';
import moment from 'moment';
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
} from 'date-fns';
import { translate } from '../../../common/utilities/localization';

export const defaultStaticRanges = createStaticRanges([
  {
    label: translate('common.constants.dateRanges.lifetime'),
    range: () => ({
      startDate: moment('1970-01-01 00:00:00').toDate(),
      endDate: moment().add(365, 'days').toDate(),
    }),
  },
  {
    label: translate('common.constants.dateRanges.today'),
    range: () => ({
      startDate: startOfDay(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: translate('common.constants.dateRanges.yesterday'),
    range: () => ({
      startDate: startOfDay(addDays(new Date(), -1)),
      endDate: endOfDay(addDays(new Date(), -1)),
    }),
  },
  {
    label: translate('common.constants.dateRanges.last7days'),
    range: () => ({
      startDate: startOfDay(addDays(new Date(), -7)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: translate('common.constants.dateRanges.last14days'),
    range: () => ({
      startDate: startOfDay(addDays(new Date(), -14)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: translate('common.constants.dateRanges.last30days'),
    range: () => ({
      startDate: startOfDay(addDays(new Date(), -30)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: translate('common.constants.dateRanges.thisMonth'),
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    }),
  },
  {
    label: translate('common.constants.dateRanges.lastMonth'),
    range: () => ({
      startDate: startOfMonth(addMonths(new Date(), -1)),
      endDate: endOfMonth(addMonths(new Date(), -1)),
    }),
  },
]);
