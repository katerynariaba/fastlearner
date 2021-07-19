import { certificateConstants } from '../Constants';
import { certificateService } from '../Services';

export const certificateActions = {
    getCertificate
};

function getCertificate(courseId) {
    return dispatch => {
        dispatch(request());

        certificateService.getCertificate(courseId)
            .then(response => response.blob())
            .then(data => window.open(URL.createObjectURL(data)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: certificateConstants.GETCERTIFICATE_REQUEST } }
    function failure(error) { return { type: certificateConstants.GETCERTIFICATE_FAILURE, error } }
}