import { courseConstants } from '../Constants';

export function searchCourses(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case courseConstants.SEARCH_REQUEST:
      return {
        ...state,
        loading: true
      };
    case courseConstants.SEARCH_SUCCESS:
      return {
        ...state,
        items: action.searchCourses
      };
    case courseConstants.SEARCH_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    default:
      return state
  }
}