import { authHeader } from "../Helpers";

export const userService = {
    login,
    logout,
    register,
    updateAvatar,
    edit,
    deleteAccount,
    editPassword,
    getProfile,
    getById
};

function getProfile() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`https://localhost:44389/users/profile`, requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`https://localhost:44389/users/${id}`, requestOptions);
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`http://localhost:58285/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:58285/users/signup`, requestOptions).then(handleResponse);
}

function updateAvatar(avatar) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: { 
            ...authHeader()
        },
    };

    return fetch(`http://localhost:58285/users/avatar`, requestOptions).then(handleResponse);
}

function edit(user) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:58285/users`, requestOptions).then(handleResponse);
}

function editPassword(password) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(password),
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:58285/users/password`, requestOptions).then(handleResponse);
}

function deleteAccount() {
    const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:58285/users`, requestOptions).then(handleResponse);
}
