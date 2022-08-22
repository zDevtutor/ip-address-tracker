import React, { Fragment, useState } from 'react';

import './IPForm.scss';

import ArrowIcon from '../../assets/images/icon-arrow.svg';

function IPForm(props) {
	const [enteredValue, setEnteredValue] = useState('');
	const [inputIsTouched, setInputIsTouched] = useState(true);

	const domainRegex = new RegExp(
		'(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\\.)+[a-zA-Z-]{2,63}$)'
	);

	const IPAddressRegex = new RegExp(
		'^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
	);

	const inputValue = enteredValue.trim().toLowerCase();

	const inputIsValid =
		inputValue !== '' &&
		(domainRegex.test(inputValue) || IPAddressRegex.test(inputValue));

	const inputChangeHandler = event => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = event => {
		if (inputIsValid) {
			setInputIsTouched(true);
		} else {
			setInputIsTouched(false);
		}
	};

	const submitFormHandler = event => {
		event.preventDefault();

		if (!inputIsValid) return;

		setEnteredValue('');
		setInputIsTouched(true);

		props.onGetLocation(enteredValue);
	};

	const formInvalidClasses = inputIsTouched ? 'form' : 'form invalid';

	return (
		<Fragment>
			<form className={formInvalidClasses} onSubmit={submitFormHandler}>
				<input
					type='text'
					placeholder='Search for any IP address or domain'
					onChange={inputChangeHandler}
					onBlur={inputBlurHandler}
					value={enteredValue}
					autoFocus
				/>
				<button type='submit'>
					<img src={ArrowIcon} alt='submit button' />
				</button>
			</form>
			{!inputIsTouched && (
				<p className='error-text'>
					Please Enter A valid IP Address or Domain Name
				</p>
			)}
		</Fragment>
	);
}

export default IPForm;
