import AuthActionTypes from './auth.types';

export const setCurrentUser = (user, token, isAuthenticated) => {
	return {
		type: AuthActionTypes.SET_CURRENT_USER,
		payload: {
			user,
			token,
			isAuthenticated
		}
	};
};