import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	componentProps,
	...rest
	}) => (
		<Route {...rest} component={(props) => (
			isAuthenticated ? (
				<Component {...props} {...componentProps} />
			) : (
				<Redirect to="/signin" />
			)
		)} />
);
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);