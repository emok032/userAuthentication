// Sign-In form
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
	
	handleFormSubmit({ email, password }) {
		console.log(email, password);
		//  Helper function: Handled by handleSubmit()
		// handleSubmit(): Handles sign-in form; Binded to event listener, onSubmit in <form>;
	}

	render() { /*
		ReduxForm provides:
		handleSubmit and fields: email, password */
		const { handleSubmit, fields: { email, password }} = this.props;

		// Below <input> will each take the email and password helpers respectively
		return (
		<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			<fieldset>
				<label>Email: </label>
				<input {...email} className="form-control" />
			</fieldset>
			<fieldset>
				<label>Password: </label>
				<input {...password} className="form-control" />
			</fieldset>
			<button action="submit" className="btn btn-primary">Sign in</button>
		</form>
		);
	}
}

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password'] 
)(Signin);