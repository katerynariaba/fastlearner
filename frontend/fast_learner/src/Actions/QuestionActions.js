import { questionConstants } from '../Constants';
import {  questionService } from '../Services';

export const  questionActions = {
    getById
};

function getById(id) {
    return dispatch => {
        dispatch(request());

        questionService.getById(id)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(questions => dispatch(success(questions)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: questionConstants.GETBYID_REQUEST } }
    function success(questions) { return { type: questionConstants.GETBYID_SUCCESS,  questions } }
    function failure(error) { return { type: questionConstants.GETBYID_FAILURE, error } }
}