import { lessonConstants } from '../Constants';

export function lessons(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case lessonConstants.GETBYCOURSEID_REQUEST:
        return {
          ...state,
          loading: true
        };
    case lessonConstants.GETBYCOURSEID_SUCCESS: {
      return {
        ...state,
        items: action.lessons 
      };
    }
    case lessonConstants.GETBYCOURSEID_FAILURE:
      return { 
        ...state,
        error: action.error
      };
      case lessonConstants.GETBYID_SUCCESS: {
        return {
          ...state,
          course: action.lesson 
        };
      }
      case lessonConstants.GETALL_FAILURE:
        return { 
          ...state,
          error: action.error
        };
    default:
      return state
  }
}