import React from 'react';
import { Link } from 'react-router-dom'

import './forgot-password.styles.scss';

class ForgotPassword extends React.Component {
	state = {
		email: '',
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
			// await auth.signInWithEmailAndPassword(email, password);
			// this.setState(() => ({
			// 	email:'',
			// 	password:'',
			// 	error: '',
			// 	submit: false
			// }));
		} catch (error) {
			this.setState(() => ({
				error: error.msg,
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
			<div className="form-box-fp">
				<h2>Forgot Password</h2>
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
					<button type="submit">Reset Password</button>
				</form>
				<Link className="form-links" to="/signin">
					Go back
				</Link>
			</div>
		);
	}
}

export default ForgotPassword;
// <Link>Forgot Password</Link>
// <Link>Don't have an Account</Link>