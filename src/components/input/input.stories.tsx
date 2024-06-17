import { useState } from 'react'
import Input from '.'

export const InputLengthExample = () => {
	const [val, setVal] = useState<string>('')
	const [inputState, setInputState] = useState<
		'danger' | 'success' | 'warning'
	>()

	const handleOnChange = ({ target: { value } }) => {
		setVal(value)

		// Example logic to determine state based on input value
		if (value === '') {
			setInputState(undefined)
		} else if (value.length < 5) {
			setInputState('danger')
		} else if (value.length < 10) {
			setInputState('warning')
		} else {
			setInputState('success')
		}
	}

	return (
		<Input
			label="A number input"
			info={inputState}
			onChange={handleOnChange}
			placeholder="A placeholder text"
			value={val}
			state={inputState}
		/>
	)
}

export const EmailExample = () => {
	const [email, setEmail] = useState<string>('')
	const [inputState, setInputState] = useState<
		'danger' | 'success' | 'warning'
	>()

	const handleOnChange = ({ target: { value } }) => {
		setEmail(value)

		// Example validation logic for email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (value === '') {
			setInputState(undefined)
		} else if (!emailRegex.test(value)) {
			setInputState('danger')
		} else if (value.length < 10) {
			setInputState('warning')
		} else {
			setInputState('success')
		}
	}

	return (
		<div>
			<Input
				label="Email"
				id="email"
				onChange={handleOnChange}
				placeholder="Enter your email"
				value={email}
				state={inputState}
			/>
		</div>
	)
}
