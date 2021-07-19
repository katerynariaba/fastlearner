import { videoConstants } from '../Constants';

export function videos(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case videoConstants.GETVIDEO_REQUEST:
        return {
          ...state,
          loading: true
        };
    case videoConstants.GETVIDEO_SUCCESS: {
      return {
        ...state,
        video: action.video 
      };
    }
    case videoConstants.GETVIDEO_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    default:
      return state
  }
}