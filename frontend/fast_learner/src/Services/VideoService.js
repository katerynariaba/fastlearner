import { authHeader } from "../Helpers";

export const videoService = {
    getVideo
};

function getVideo(lessonName) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/video/${lessonName}`, requestOptions);
}
