import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

export const PublicRoute = ({
	isAuthenticated,
	component: Component,
	componentProps,
	...rest
	}) => (
		<Route {...rest} component={(props) => (
			isAuthenticated ? (
				<Redirect to="/" />
			) : (
				<Component {...props} {...componentProps} />
			)
		)} />
);
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);