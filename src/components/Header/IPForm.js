import React, { Fragment, useState } from 'react';

import './IPForm.scss';

import ArrowIcon from '../../assets/images/icon-arrow.svg';
import { useEffect } from 'react';

function IPForm(props) {
	const [enteredValue, setEnteredValue] = useState('');
	const [inputIsValid, setInputIsValid] = useState(true);

	const domainRegex = new RegExp(
		'(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\\.)+[a-zA-Z-]{2,63}$)'
	);

	const IPAddressRegex = new RegExp(
		'^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
	);

	const inputChangeHandler = event => {
		setEnteredValue(event.target.value);
	};

	const submitFormHandler = event => {
		event.preventDefault();

		const inputValue = enteredValue.trim().toLowerCase();

		if (
			inputValue !== '' &&
			(domainRegex.test(inputValue) || IPAddressRegex.test(inputValue))
		) {
			setInputIsValid(true);
			props.onGetLocation(inputValue);
		} else {
			setInputIsValid(false);
		}
	};

	useEffect(() => {
		if (props.error) {
			setInputIsValid(false);
		}
	}, [props.error]);

	return (
		<>
			<form
				className={inputIsValid ? 'form' : 'form invalid'}
				onSubmit={submitFormHandler}>
				<input
					type='text'
					placeholder='Search for any IP address or domain'
					onChange={inputChangeHandler}
					value={enteredValue}
					autoFocus
				/>
				<button type='submit'>
					<img src={ArrowIcon} alt='submit button' />
				</button>
			</form>
			{!inputIsValid && (
				<p className='error-text'>
					Please Enter A valid IP Address or Domain Name
				</p>
			)}
		</>
	);
}

export default IPForm;
