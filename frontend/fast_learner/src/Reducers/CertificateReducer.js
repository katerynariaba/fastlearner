import { certificateConstants } from '../Constants';

export function certificate(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case certificateConstants.GETCERTIFICATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case certificateConstants.GETCERTIFICATE_SUCCESS: {
      return {
        ...state,
        certificate: action.certificate
      };
    }
    case certificateConstants.GETCERTIFICATE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state
  }
}