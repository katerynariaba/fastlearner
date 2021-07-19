import { authHeader } from "../Helpers";

export const lessonService = {
    getByCourseId,
    getById
};

function getByCourseId(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/lessons/course/${id}`, requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            ...authHeader()
        },
    };

    return fetch(`https://localhost:44389/lessons/${id}`, requestOptions);
}
