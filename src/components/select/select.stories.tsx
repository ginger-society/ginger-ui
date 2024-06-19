import React, { useState } from 'react'
import Select, { Option } from './Select'

const options = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' }
]

export const Example: React.FC = () => {
	const handleChange = (value: Option) => {
		console.log('Selected value:', value)
		setSelected(value)
	}
	const [selected, setSelected] = useState<Option | null>(null)

	return (
		<Select
			value={selected}
			options={options}
			renderer={(option) => <span>{option.label}</span>}
			onChange={handleChange}
		/>
	)
}
