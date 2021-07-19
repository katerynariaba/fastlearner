import { videoConstants } from '../Constants';
import { videoService } from '../Services';

export const videoActions = {
    getVideo
};

function getVideo(videoName) {
    return dispatch => {
        dispatch(request());

        videoService.getVideo(videoName)
            .then(response => {
                console.log(response)
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(video => dispatch(success(video)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: videoConstants.GETVIDEO_REQUEST } }
    function success(video) { return { type: videoConstants.GETVIDEO_SUCCESS, video } }
    function failure(error) { return { type: videoConstants.GETVIDEO_FAILURE, error } }
}
