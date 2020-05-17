import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import ForgotPassword from '../../components/forgot-password/forgot-password.component';

import './auth.styles.scss';

const components = {
	'sign-in': SignIn,
	'sign-up': SignUp,
	'forgot-password': ForgotPassword
}

const AuthPage = ({ pageType }) =>  {
	const AuthComponent = components[pageType];
	return (
		<div className="auth">
			<AuthComponent />
		</div>
	);
};

export default AuthPage;