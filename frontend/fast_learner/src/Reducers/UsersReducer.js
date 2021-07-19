import { userConstants } from '../Constants';

export function users(state = {}, action) {
    switch (action.type) {
    case userConstants.GETALL_REQUEST:
        return {
            ...state,
            loading: true
        };
    case userConstants.GETALL_SUCCESS:
        return {
            ...state,
        items: action.users
        };
    case userConstants.GETALL_FAILURE:
        return {
            ...state,
        error: action.error
        };
    case userConstants.EDIT_REQUEST:
        return {
            ...state,
            editing: true
        };
    case userConstants.EDIT_SUCCESS:
        return {
            ...state,
            editing: false
        };
    case userConstants.EDIT_REQUEST:
        return {
            ...state,
            editingAvatar: true
        };
    case userConstants.EDIT_SUCCESS:
        return {
            ...state,
            editingAvatar: false
        };
    case userConstants.EDIT_FAILURE:
    return {
        ...state,
        editingAvatar: false
    };
    case userConstants.EDITPASSWORD_REQUEST:
        return {
            ...state,
            editingPass: true
        };
    case userConstants.EDITPASSWORD_SUCCESS:
        return {
            ...state,
            editingPass: false
        };
    case userConstants.EDITPASSWORD_FAILURE:
    return {
        ...state,
        editingPass: false
    };
    case userConstants.UPDATEAVATAR_REQUEST:
        return {
            ...state,
            update: true
        };
    case userConstants.UPDATEAVATAR_SUCCESS:
        return {
            ...state,
            update: false
        };
    case userConstants.UPDATEAVATAR_FAILURE:
    return {
        ...state,
        update: false
    };
    case userConstants.DELETE_REQUEST:
        return {
            ...state,
            deleting: true
        };
    case userConstants.DELETE_SUCCESS:
        return {
            ...state,
            deleting: false
        };
    case userConstants.DELETE_FAILURE:
        return {
            ...state,
            deleting: false
        };
    case userConstants.GETPROFILE_SUCCESS: {
        return {
          ...state,
          user: action.user 
        };
      }
      case userConstants.GETBYID_SUCCESS: {
        return {
          ...state,
          user: action.user 
        };
      }
    default:
        return state
    }
}