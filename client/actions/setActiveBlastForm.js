import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export default function setActiveBlastForm (params) {
  return {
    type: ActionTypes.SET_ACTIVE_BLAST_FORM,
    payload: params
  }
}
