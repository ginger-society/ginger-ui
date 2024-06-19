import SvgIcons8Bookmark from '@src/icons/Icons8Bookmark'
import React, { useState } from 'react'
import MultiSelect from './MultiSelect'
import Select, { Option } from './Select'

const options = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' }
]

export const ExampleWithRenderer: React.FC = () => {
	const handleChange = (value: Option) => {
		console.log('Selected value:', value)
		setSelected(value)
	}
	const [selected, setSelected] = useState<Option | null>(null)

	return (
		<div style={{ width: '400px' }}>
			<Select
				value={selected}
				options={options}
				renderer={(option) => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
						<SvgIcons8Bookmark /> {option.label}
					</div>
				)}
				onChange={handleChange}
			/>
		</div>
	)
}

export const Example: React.FC = () => {
	const handleChange = (value: Option) => {
		console.log('Selected value:', value)
		setSelected(value)
	}
	const [selected, setSelected] = useState<Option | null>(null)

	return (
		<div style={{ width: '400px' }}>
			<Select value={selected} options={options} onChange={handleChange} />
		</div>
	)
}

export const ExampleMultiSelect: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

	const handleChange = (value: Option[]) => {
		setSelectedOptions(value)
	}

	return (
		<div>
			<h2>Select Options</h2>
			<MultiSelect
				options={options}
				onChange={handleChange}
				value={selectedOptions}
				renderer={(option) => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
						<SvgIcons8Bookmark /> {option.label}
					</div>
				)}
			/>
			<div>
				Selected Options:{' '}
				{selectedOptions.length > 0
					? selectedOptions.map((option) => option.label).join(', ')
					: 'None selected'}
			</div>
		</div>
	)
}
