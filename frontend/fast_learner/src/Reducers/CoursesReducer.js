import { courseConstants } from '../Constants';

export function courses(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case courseConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case courseConstants.GETALL_SUCCESS: {
      return {
        ...state,
        items: action.courses ? action.courses : action.searchCourses
      };
    }
    case courseConstants.GETPOPULAR_REQUEST:
      return {
        ...state,
        loading: true
      };
    case courseConstants.GETPOPULAR_SUCCESS: {
      return {
        ...state,
        items: action.courses
      };
    }
    case courseConstants.GETRECOM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case courseConstants.GETRECOM_SUCCESS: {
      return {
        ...state,
        items: action.courses
      };
    }
    case courseConstants.GETPAGINATED_REQUEST:
      return {
        ...state,
        loading: true
      };
    case courseConstants.GETPAGINATED_SUCCESS: {
      return {
        ...state,
        items: action.courses
      };
    }
    case courseConstants.GETBYID_SUCCESS: {
      return {
        ...state,
        course: action.course 
      };
    }
    case courseConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case courseConstants.GETPOPULAR_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case courseConstants.GETRECOM_FAILURE:
      return { 
        ...state,
        error: action.error
      };
      case courseConstants.GETPAGINATED_FAILURE:
        return { 
          ...state,
          error: action.error
        };
    case courseConstants.GETBYCATEGORYID_REQUEST:
        return {
          ...state,
          loading: true
        };
    case courseConstants.GETBYCATEGORYID_SUCCESS: {
      return {
        ...state,
        items: action.courses 
      };
    }
    case courseConstants.GETBYCATEGORYID_FAILURE:
      return { 
        ...state,
        error: action.error
      };
      case courseConstants.GETBYUSER_REQUEST:
        return {
          ...state,
          loading: true
        };
    case courseConstants.GETBYUSER_SUCCESS: {
      return {
        ...state,
        items: action.courses 
      };
    }
    case courseConstants.GETBYUSER_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case courseConstants.SUBSCRIBE_REQUEST:
        return {
            ...state,
            subscribing: true
        };
    case courseConstants.SUBSCRIBE_SUCCESS:
        return {
            ...state,
            items: [...state.items.filter(item => item.id === action.courseId)],
            course: {
              ...state.course,
              isUserSubscribed: true,
            },
            subscribing: false
        };
    case courseConstants.SUBSCRIBE_FAILURE:
        return {
            ...state,
            subscribing: false,
        };
    case courseConstants.UNSUBSCRIBE_REQUEST:
        return {
            ...state,
            unsubscribing: true
        };
    case courseConstants.UNSUBSCRIBE_SUCCESS:
        return {
            ...state,
            items: [...state.items.filter(item => item.id !== action.courseId)],
            course: {
              ...state.course,
              isUserSubscribed: false,
            },
            unsubscribing: false
        };
    case courseConstants.UNSUBSCRIBE_FAILURE:
        return {
            ...state,
            unsubscribing: false
        };
    default:
      return state
  }
}