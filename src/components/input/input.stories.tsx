import { useState } from 'react'
import Input from '.'

export const Example = () => {
	const [val, setVal] = useState<string>('')

	const handleOnChange = ({ target: { value } }) => {
		setVal(value)
	}

	return (
		<Input
			onChange={handleOnChange}
			placeholder="A placeholder text"
			value={val}
		/>
	)
}
