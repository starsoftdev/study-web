import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function saveStudy (currentUser, studyId, studyData) {
  const actionType = studyId? ActionTypes.UPDATE_STUDY: ActionTypes.CREATE_STUDY

  return asyncAction(actionType, { studyId, studyData }, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      cb(err, payload)
      dispatch({
        type: ActionTypes.FINISH_SAVE_STUDY,
        studyData: payload
      })
    }

    studyData = JSON.parse(JSON.stringify(studyData))
    if (studyId) {
      dispatch(updateEntity('/studies/' + studyId, studyData, afterSave))
    } else {
      dispatch(createEntity('/studies', studyData, afterSave))
    }
  })
}
