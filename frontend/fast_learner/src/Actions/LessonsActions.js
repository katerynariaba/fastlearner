import { lessonConstants } from '../Constants';
import { lessonService } from '../Services';

export const lessonsActions = {
    getByCourseId
};

function getByCourseId(id) {
    return dispatch => {
        dispatch(request());

        lessonService.getByCourseId(id)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(lessons => dispatch(success(lessons)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: lessonConstants.GETBYCOURSEID_REQUEST } }
    function success(lessons) { return { type: lessonConstants.GETBYCOURSEID_SUCCESS, lessons } }
    function failure(error) { return { type: lessonConstants.GETBYCOURSEID_FAILURE, error } }
}