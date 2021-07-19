import { authHeader } from "../Helpers";

export const commentService = {
    getByCourseId,
    add,
    remove
};

function handleResponse(response) {
    if (response.status < 300) {
        return response.json().catch((e) => { console.log(e); return null; })
    }

    throw new Error('Test')
}

function getByCourseId(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`https://localhost:44389/comments/course/${id}`, requestOptions).then(handleResponse);
}

function add(comment, courseId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: comment })
    };

    return fetch(`https://localhost:44389/comments/${courseId}`, requestOptions).then(handleResponse);
}

function remove(commentId) {
    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`https://localhost:44389/comments/${commentId}`, requestOptions).then(handleResponse);
}