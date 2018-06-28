/*
 *
 * Media Tracking Modal actions
 *
 */

import {
  DELETE_MEDIA_TYPE,
  DELETE_MEDIA_TYPE_SUCCESS,
} from './constants';

export function deleteMediaType(studyId, studySourceId, index) {
  return {
    type: DELETE_MEDIA_TYPE,
    studyId,
    studySourceId,
    index,
  };
}

export function deleteMediaTypeSuccess(index) {
  return {
    type: DELETE_MEDIA_TYPE_SUCCESS,
    index,
  };
}
