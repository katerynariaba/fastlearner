import { questionConstants } from '../Constants';

export function questions(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case questionConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case questionConstants.GETBYID_SUCCESS: {
      return {
        ...state,
        items: action.questions
      };
    }
    case questionConstants.GETBYID_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state
  }
}