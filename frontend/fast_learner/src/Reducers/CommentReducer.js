import { commentConstants } from '../Constants';

export function comments(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case commentConstants.GETBYCOURSEID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case commentConstants.GETBYCOURSEID_SUCCESS: {
      return {
        ...state,
        items: action.comments
      };
    }
    case commentConstants.GETBYCOURSEID_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case commentConstants.ADD_REQUEST:
      return {
        ...state,
        adding: true
      };
    case commentConstants.ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        items: state.items ? [...state.items, action.comment] : [action.comment]
      };
    case commentConstants.GETBYCOURSEID_FAILURE:
      return {
        ...state,
        error: action.error
      };
      case commentConstants.DELETE_REQUEST:
        return {
            ...state,
            deleting: true
        };
    case commentConstants.DELETE_SUCCESS:
        return {
            ...state,
            items: [...state.items.filter(item => item.id !== action.id)],
            deleting: false
        };
    case commentConstants.DELETE_FAILURE:
        return {
            ...state,
            deleting: false
        };
    default:
      return state
  }
}