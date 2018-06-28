import {
  DELETE_MEDIA_TYPE_SUCCESS,
} from './constants';
import { FETCH_MEDIA_TYPES_SUCCESS } from '../../containers/App/constants';
import { formatPhone } from '../../common/helper/functions';

const initialState = {
};

export default function mediaTrackingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEDIA_TYPES_SUCCESS:
      return {
        ...state,
        values: {
          ...state.values,
          mediaType: action.payload.map((item) => {
            return {
              source: {
                value: item.sourceId,
                label: item.type,
              },
              sourceName: item.sourceName,
              studySourceId: item.studySourceId,
              landingPageId: item.landingPageId,
              recruitmentPhone: item.recruitmentPhone !== '' ? formatPhone(item.recruitmentPhone) : '',
              messagingNumber: item.phoneNumberId ? { value: item.phoneNumberId, label: item.phoneNumber } : null,
              googleUrl: item.googleUrl,
              url: item.url,
              studyId: item.studyId,
              landingPageUrl: item.landingPageUrl,
              patientsCount: parseInt(item.patientsCount),
            };
          }),
        },
      };
    case DELETE_MEDIA_TYPE_SUCCESS:
      return {
        ...state,
        values: {
          ...state.values,
          mediaType: state.values.mediaType.filter((item, index) => {
            return index !== action.index;
          }),
        },
      };
    default:
      return state;
  }
}
