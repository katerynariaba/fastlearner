import { categoryConstants } from '../Constants';

export function categories(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case categoryConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.categories
      };
    case categoryConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case categoryConstants.GETBYID_SUCCESS: {
      return {
        ...state,
        category: action.category 
      };
    }
    default:
      return state
  }
}