import SvgIcons8Document from '@src/icons/Icons8Document'
import SvgIcons8Refresh from '@src/icons/Icons8Done'
import { useState } from 'react'
import Input from './Input'

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
			label="A lengthy input example"
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
				clearable={true}
			/>
		</div>
	)
}

export const PasswordExample = () => {
	const [password, setPassword] = useState<string>('')

	const handleOnChange = ({ target: { value } }) => {
		setPassword(value)
	}

	return (
		<div>
			<Input
				label="Password"
				id="email"
				onChange={handleOnChange}
				placeholder="Enter a password"
				value={password}
				type="password"
			/>
		</div>
	)
}

export const ClearableExample = () => {
	const [password, setPassword] = useState<string>('')

	const handleOnChange = ({ target: { value } }) => {
		setPassword(value)
	}

	return (
		<div>
			<Input
				label="Text Input Example"
				id="email"
				onChange={handleOnChange}
				placeholder="Enter a value"
				value={password}
				type="text"
				clearable={true}
			/>
		</div>
	)
}

export const WithEnhancerExample = () => {
	const [password, setPassword] = useState<string>('')

	const handleOnChange = ({ target: { value } }) => {
		setPassword(value)
	}

	return (
		<div>
			<Input
				label="Text Input Example"
				id="email"
				onChange={handleOnChange}
				placeholder="Enter a value"
				value={password}
				type="text"
				endEnhancer={<SvgIcons8Refresh fill="var(--primary-color)" />}
				startEnhancer={<SvgIcons8Document fill="var(--primary-color)" />}
			/>
		</div>
	)
}
