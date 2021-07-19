import { authHeader } from "../Helpers";

export const courseService = {
    getAll,
    getById,
    search,
    getByCategoryId,
    getPopular,
    subscribe,
    unsubscribe,
    getByUser,
    getRecom,
    getPaginated
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/courses`, requestOptions);
}

function getPopular() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/courses/popular`, requestOptions);
}

function getRecom(categoryId) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/courses/recommendations/${categoryId}`, requestOptions);
}

function getPaginated(page) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/courses/page/${page}`, requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader(),
        },
    };

    return fetch(`https://localhost:44389/courses/${id}`, requestOptions);
}

function search(search) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/courses/search?search=${search}`, requestOptions);
}

function getByCategoryId(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/courses?category=${id}`, requestOptions);
}

function getByUser() {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`https://localhost:44389/courses/my`, requestOptions);
}

function subscribe(courseId) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:58285/courses/${courseId}/subscribe`, requestOptions);
}

function unsubscribe(courseId) {
    const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify(courseId),
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:58285/courses/${courseId}/unsubscribe`, requestOptions);
}
