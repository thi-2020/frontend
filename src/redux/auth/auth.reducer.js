import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
	user: null,
	isAuthenticated: false,
	token: null
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AuthActionTypes.SET_CURRENT_USER:
			return {
				...state,
				...action.payload
			}
		default : 
			return state;
	}
};

export default authReducer;