import { userConstants } from '../Constants';
import { userService } from '../Services';
import { alertActions } from '.';
import { history } from '../Helpers';

export const userActions = {
    login,
    logout,
    register,
    edit,
    deleteAccount,
    editPassword,
    profile,
    updateAvatar,
    getById
};

function profile() {
    return dispatch => {
        dispatch(request());

        userService.getProfile()
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(user => dispatch(success(user)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: userConstants.GETPROFILE_REQUEST } }
    function success(user) { return { type: userConstants.GETPROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETPROFILE_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(user => dispatch(success(user)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/cabinet');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error('The login or password you entered is incorrect'));
                }
            )
            .catch(() => {});
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful! An email address has been sent message with a link to confirm registration.'));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error('Account with this email already exists'));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function edit(user) {
    return dispatch => {
        dispatch(request(user));

        userService.edit(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success());
                    history.push('/cabinet');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error());
                }
            );
    };

    function request(user) { return { type: userConstants.EDIT_REQUEST, user } }
    function success(user) { return { type: userConstants.EDIT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EDIT_FAILURE, error } }
}

function editPassword(password) {
    return dispatch => {
        dispatch(request(password));

        userService.editPassword(password)
            .then(
                password => { 
                    dispatch(success());
                    dispatch(alertActions.success('Password change was successful'));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(password) { return { type: userConstants.EDITPASSWORD_REQUEST, password } }
    function success(password) { return { type: userConstants.EDITPASSWORD_SUCCESS, password } }
    function failure(error) { return { type: userConstants.EDITPASSWORD_FAILURE, error } }
}

function updateAvatar(avatar) {
    return dispatch => {
        dispatch(request(avatar));

        userService.updateAvatar(avatar)
            .then(
                avatar => { 
                    dispatch(success());
                    dispatch(alertActions.success('Avatar change was successful'));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(avatar) { return { type: userConstants.UPDATEAVATAR_REQUEST, avatar } }
    function success(avatar) { return { type: userConstants.UPDATEAVATAR_SUCCESS, avatar } }
    function failure(error) { return { type: userConstants.UPDATEAVATAR_FAILURE, error } }
}

function deleteAccount() {
    return dispatch => {
        dispatch(request());

        userService.deleteAccount()
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success());
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error());
                }
            );
    };

    function request() { return { type: userConstants.DELETE_REQUEST,  } }
    function success() { return { type: userConstants.DELETE_SUCCESS,  } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
}