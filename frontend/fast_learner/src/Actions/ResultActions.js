import { resultConstants } from '../Constants';
import { resultService } from '../Services';

export const resultActions = {
    add,
    getHistory
};

function add(questionnaireId, correctAnswers) {
    return dispatch => {
        dispatch(request(questionnaireId, correctAnswers));

        resultService.add(questionnaireId, correctAnswers)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(result => dispatch(success(result)))
            .catch(error => dispatch(failure(error)))
    };

    function request(result) { return { type: resultConstants.ADD_REQUEST, result } }
    function success(result) { return { type: resultConstants.ADD_SUCCESS, result } }
    function failure(error) { return { type: resultConstants.ADD_FAILURE, error } }
}

function getHistory(courseId) {
    return dispatch => {
        dispatch(request(courseId));

        resultService.getHistory(courseId)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(results => dispatch(success(results)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: resultConstants.GETHISTORY_REQUEST } }
    function success(results) { return { type: resultConstants.GETHISTORY_SUCCESS, results } }
    function failure(error) { return { type: resultConstants.GETHISTORY_FAILURE, error } }
}