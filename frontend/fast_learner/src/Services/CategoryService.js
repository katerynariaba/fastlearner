export const categoryService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/categories`, requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`https://localhost:44389/categories/${id}`, requestOptions);
}
