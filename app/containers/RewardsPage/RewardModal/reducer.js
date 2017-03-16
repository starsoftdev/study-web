import { PICK_REWARD } from '../constants';

export default function rewardForm(state = {}, action) {
  switch (action.type) {
    case PICK_REWARD:
      return {
        ...state,
        values: {
          ...state.values,
          redemptionType: action.value,
        },
      };
    default:
      return state;
  }
}
