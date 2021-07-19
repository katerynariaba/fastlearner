import { authHeader } from "../Helpers";

export const resultService = {
    add,
    getHistory
};

function add(questionnaireId, correctAnswers) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ correctAnswers }),
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:58285/questionnaires/${questionnaireId}/result`, requestOptions);
}

function getHistory(courseId) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            ...authHeader(),
        },
    };

    return fetch(`http://localhost:58285/questionnaires/${courseId}/result`, requestOptions);
}