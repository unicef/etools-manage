import { AppMiddleware } from 'global-types';
import { redirectToLogin } from 'actions';
import { getEnvironmentLoginPath } from 'utils';

export const authMiddleware: AppMiddleware = () => dispatch => action => {
    if (action.type === redirectToLogin.type) {
        window.location.href = getEnvironmentLoginPath();
    }

    dispatch(action);
};
