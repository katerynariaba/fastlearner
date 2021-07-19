import { authHeader } from "../Helpers";

export const questionService = {
    getById
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`https://localhost:44389/questions/${id}`, requestOptions);
}
