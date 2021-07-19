import { commentConstants } from '../Constants';
import { commentService } from '../Services';
import { alertActions } from './AlertActions';

export const commentActions = {
    getByCourseId,
    add,
    remove
};

function getByCourseId(id) {
    return dispatch => {
        dispatch(request());

        commentService.getByCourseId(id)
            .then(comments => dispatch(success(comments)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: commentConstants.GETBYCOURSEID_REQUEST } }
    function success(comments) { return { type: commentConstants.GETBYCOURSEID_SUCCESS, comments } }
    function failure(error) { return { type: commentConstants.GETBYCOURSEID_FAILURE, error } }
}

function add(comment, courseId) {
    return dispatch => {
        dispatch(request(comment, courseId));

        commentService.add(comment, courseId)
            .then(response => dispatch(success(response)))
            .catch(error => dispatch(failure(error)))
    };

    function request(response) { return { type: commentConstants.ADD_REQUEST, comment: response } }
    function success(response) { return { type: commentConstants.ADD_SUCCESS, comment: response } }
    function failure(error) { return { type: commentConstants.ADD_FAILURE, error } }
}

function remove(commentId) {
    return dispatch => {
        dispatch(request());

        commentService.remove(commentId)
            .then(
                () => dispatch(success(commentId)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error());
                }
            );
    };

    function request() { return { type: commentConstants.DELETE_REQUEST,  } }
    function success(id) { return { type: commentConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: commentConstants.DELETE_FAILURE, error } }
}
