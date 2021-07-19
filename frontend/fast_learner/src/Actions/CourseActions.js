import { courseConstants } from '../Constants';
import { courseService } from '../Services';

export const courseActions = {
    getAll,
    search, 
    getById,
    getByCategoryId,
    getPopular,
    subscribe,
    unsubscribe,
    getByUser,
    getRecom,
    getPaginated
};

function getAll() {
    return dispatch => {
        dispatch(request());

        courseService.getAll()
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETALL_REQUEST } }
    function success(courses) { return { type: courseConstants.GETALL_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETALL_FAILURE, error } }
}

function getPopular() {
    return dispatch => {
        dispatch(request());

        courseService.getPopular()
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETPOPULAR_REQUEST } }
    function success(courses) { return { type: courseConstants.GETPOPULAR_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETPOPULAR_FAILURE, error } }
}

function getRecom(categoryId) {
    return dispatch => {
        dispatch(request());

        courseService.getRecom(categoryId)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETRECOM_REQUEST } }
    function success(courses) { return { type: courseConstants.GETRECOM_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETRECOM_FAILURE, error } }
}

function getPaginated(page) {
    return dispatch => {
        dispatch(request());

        courseService.getPaginated(page)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETPAGINATED_REQUEST } }
    function success(courses) { return { type: courseConstants.GETPAGINATED_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETPAGINATED_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        courseService.getById(id)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(course => dispatch(success(course)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETBYID_REQUEST } }
    function success(course) { return { type: courseConstants.GETBYID_SUCCESS, course } }
    function failure(error) { return { type: courseConstants.GETBYID_FAILURE, error } }
}

function search(search) {
    return dispatch => {
        dispatch(request());

        courseService.search(search)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.SEARCH_REQUEST } }
    function success(courses) { return { type: courseConstants.GETALL_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETALL_FAILURE, error } }
}

function getByCategoryId(id) {
    return dispatch => {
        dispatch(request());

        courseService.getByCategoryId(id)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETBYCATEGORYID_REQUEST } }
    function success(courses) { return { type: courseConstants.GETBYCATEGORYID_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETBYCATEGORYID_FAILURE, error } }
}

function getByUser() {
    return dispatch => {
        dispatch(request());

        courseService.getByUser()
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(courses => dispatch(success(courses)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: courseConstants.GETBYUSER_REQUEST } }
    function success(courses) { return { type: courseConstants.GETBYUSER_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETBYUSER_FAILURE, error } }
}

function subscribe(courseId) {
    return dispatch => {
        dispatch(request(courseId));

        courseService.subscribe(courseId)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(course => dispatch(success(course)))
            .catch(error => dispatch(failure(error)))
    };

    function request(course) { return { type: courseConstants.SUBSCRIBE_REQUEST, course } }
    function success(course) { return { type: courseConstants.SUBSCRIBE_SUCCESS, course } }
    function failure(error) { return { type: courseConstants.SUBSCRIBE_FAILURE, error } }
}

function unsubscribe(courseId) {
    return dispatch => {
        dispatch(request(courseId));

        courseService.unsubscribe(courseId)
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(course => dispatch(success(course, courseId)))
            .catch(error => dispatch(failure(error)))
    };

    function request(course) { return { type: courseConstants.UNSUBSCRIBE_REQUEST, course } }
    function success(course, courseId) { return { type: courseConstants.UNSUBSCRIBE_SUCCESS, course, courseId } }
    function failure(error) { return { type: courseConstants.UNSUBSCRIBE_FAILURE, error } }
}