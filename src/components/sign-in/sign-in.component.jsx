import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/auth/auth.actions';
import axios from 'axios';

import './sign-in.styles.scss';

class SignIn extends React.Component {
	state = {
		email: '',
		password: '',
		error: '',
		submit: false
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = this.state;
		try {
			this.setState(() => ({
				error: '',
				submit: true
			}));
			const { data } = await axios.post("http://13.235.134.196:8006/cust_auth/login/", { email, password });
			this.setState(() => ({
				email:'',
				password:'',
				error: '',
				submit: false
			}));
			await this.props.setCurrentUser(data.user, data.access, true);
		} catch (error) {
			this.setState(() => ({
				error: error.response.data.detail,
				submit: false
			}));
		}
		
	}

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState(() => ({
			[name]: value
		}));
	}

	render () {
		return (
			<div className="form-box">
				<h2>Sign In</h2>
				{this.state.error && <p className="form-error">{this.state.error}</p>}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="email"
						id="email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						id="password"
						value={this.state.password}
						onChange={this.handleChange}
						required
					/>
					<button type="submit">Sign In</button>
				</form>
				<Link className="form-links" to="/forgotpassword">
					Forgot Password?
				</Link>
				<Link className="form-links" to="/signup">
					Don't have an Account? Sign Up
				</Link>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setCurrentUser: (user, token, isAuthenticated) => dispatch(setCurrentUser(user, token, isAuthenticated))
});

export default connect(null, mapDispatchToProps)(SignIn);