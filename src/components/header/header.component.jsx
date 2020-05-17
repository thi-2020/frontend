import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from '../../redux/auth/auth.actions';
import { ReactComponent as Logo } from '../../assets/logo.svg';
// @import "~bulma/sass/utilities/initial-variables.sass";
// $navbar-breakpoint: $tablet;
// import 'bulma/bulma.sass';
import './header.styles.scss';

const Header = ({ isAuthenticated, logOut }) =>  {
	const [isActive, setisActive] = React.useState(false);
	console.log(isAuthenticated, logOut);
	return (
		<header>
			<nav className="navbar is-black">
				<div className="navbar-brand">
					<NavLink className="navbar-item" to="/">
						<Logo width="30" height="30" />
					</NavLink>
					<div
						className={`navbar-burger burger is-dark ${isActive ? 'is-active': ''}`}
						data-target="navMenu"
						onClick={()=>setisActive(!isActive)}
					>
						<span></span>
						<span></span>
						<span></span>
						{!isAuthenticated && <span></span>}
					</div>
				</div>
				<div id="navMenu" className={`navbar-menu ${isActive ? 'is-active': ''}`}>
					<div className="navbar-start">
						<NavLink className="navbar-item" to="/">
							Home
						</NavLink>
						<NavLink className="navbar-item" to="/">
							Contact Us
						</NavLink>
					</div>
					<div className="navbar-end">
					{ isAuthenticated ? (
						<div className="navbar-item">
							<button className="logout-button" onClick={logOut}>Sign Out</button>
						</div>
						)
						: (
						<React.Fragment>
							<NavLink className="navbar-item" to="/signin">
								Login
							</NavLink>
							<NavLink className="navbar-item" to="/signup">
								Register
							</NavLink>
						</React.Fragment>)
					}
					</div>
				</div>
			</nav>
		</header>
	);
};

const mapDispatchToProps = dispatch => ({
	logOut: () => dispatch(setCurrentUser(null, null, false))
});

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);