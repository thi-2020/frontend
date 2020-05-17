import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import axios from 'axios';

import { setCurrentUser } from '../../redux/auth/auth.actions';
 
import "react-datepicker/dist/react-datepicker.css";
import './sign-up.styles.scss';

const INITIAL_STATE = {
	firstName: '',
	lastName: '',
	username: '',
	mobile: '',
	dob: new Date(),
	email: '',
	password: '',
	confirmPassword: '',
	error: '',
	submit: false,
};

class SignUp extends React.Component {
	state = INITIAL_STATE;

	handleSubmit = async (e) => {
		e.preventDefault();

		const { firstName, lastName, username, email, mobile, dob, password, confirmPassword } = this.state;
		if(password !== confirmPassword){
			this.setState(() => ({
				error: 'Passwords do not match',
			}));
			return;
		}
		const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		if(!password.match(regularExpression)){
			this.setState(() => ({
				error: 'Passwords must contain atleast one aplhabet, number and a special character',
			}));
			return;
		}
		try {
			this.setState(() => ({
				error: '',
				submit: true
			}));
			const result = await axios.post("http://13.235.134.196:8006/accounts/createuser/", {
				first_name: firstName,
				last_name: lastName,
				username,
				email: email,
				phone: mobile,
				dob: dob.getFullYear() + '-' + (dob.getMonth()+1) + '-'+ (dob.getDate()),
				password
			});
			const { data } = await axios.post("http://13.235.134.196:8006/cust_auth/login/", { email, password });
			await this.props.setCurrentUser(
				{ email, firstName, lastName, username, mobile, dob },
				data.access,
				true
			);
			this.setState(() => (INITIAL_STATE));
		} catch (error) {
			this.setState(() => ({
				error: JSON.stringify(error.response.data.error),
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

	handleDateChange = (dob) => {
		this.setState(() => ({ dob: dob }));
		console.log(JSON.stringify(dob));
	}

	render () {
		return (
			<div className="form-box-signup">
				<h2>Sign Up</h2>
				{this.state.error && <p className="form-error">{this.state.error}</p>}
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="firstName">First Name</label>
					<input
						name="firstName"
						type="text"
						id="firstName"
						value={this.state.firstName}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="lastName">Last Name</label>
					<input
						name="lastName"
						type="text"
						id="lastName"
						value={this.state.lastName}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="email"
						id="email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="mobile">Contact No.</label>
					<input
						name="mobile"
						type="number"
						id="mobile"
						value={this.state.mobile}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="username">Username</label>
					<input
						name="username"
						type="text"
						id="userName"
						value={this.state.username}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="dob">D.O.B</label>
					<DatePicker
						selected={this.state.dob}
						onChange={this.handleDateChange}
						showYearDropdown
       					scrollableYearDropdown={true}
						id="dob"
						maxDate={new Date()}
						minDate={new Date(0)}
					/>
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						id="password"
						minLength="8"
						value={this.state.password}
						onChange={this.handleChange}
						required
					/>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						name="confirmPassword"
						type="password"
						id="confirmPassword"
						minLength="8"
						value={this.state.confirmPassword}
						onChange={this.handleChange}
						required
					/>
					<button type="submit">Sign Up</button>
				</form>
				<Link className="form-links" to="/signin">
					Have an account? Sign In
				</Link>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setCurrentUser: (user, token, isAuthenticated) => dispatch(setCurrentUser(user, token, isAuthenticated))
});

export default connect(null, mapDispatchToProps)(SignUp);