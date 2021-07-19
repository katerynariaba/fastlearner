import { resultConstants } from '../Constants';

export function results(state = {}, action) {
    switch (action.type) {
    case resultConstants.ADD_REQUEST:
        return {
            ...state,
            adding: true
        };
    case resultConstants.ADD_SUCCESS:
        return {
            ...state,
            adding: false
        };
    case resultConstants.ADD_FAILURE:
        return {
            ...state,
            adding: false,
        };
        case resultConstants.GETHISTORY_REQUEST:
            return {
              ...state,
              loading: true
            };
        case resultConstants.GETHISTORY_SUCCESS: {
          return {
            ...state,
            items: action.results
          };
        }
        case resultConstants.GETHISTORY_FAILURE:
          return { 
            ...state,
            error: action.error
          };
    default:
        return state
    }
}