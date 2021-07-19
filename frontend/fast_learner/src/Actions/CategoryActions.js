import { categoryConstants } from '../Constants';
import { categoryService } from '../Services';

export const categoryActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        categoryService.getAll()
            .then(response => {
                if (response.status < 300) {
                    return response.json().catch(() => { return null; })
                }

                throw new Error('Test')
            })
            .then(categories => dispatch(success(categories)))
            .catch(error => dispatch(failure(error)))
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}
