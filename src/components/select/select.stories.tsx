import SvgIcons8Bookmark from '@src/icons/Icons8Bookmark'
import React, { useState } from 'react'
import MultiSelect from './MultiSelect'
import Select, { Option } from './Select'

const options = [
	{ label: 'United States', value: 'US' },
	{ label: 'Canada', value: 'CA' },
	{ label: 'Mexico', value: 'MX' },
	{ label: 'United Kingdom', value: 'GB' },
	{ label: 'Germany', value: 'DE' },
	{ label: 'France', value: 'FR' },
	{ label: 'Italy', value: 'IT' },
	{ label: 'Spain', value: 'ES' },
	{ label: 'Australia', value: 'AU' },
	{ label: 'New Zealand', value: 'NZ' },
	{ label: 'Japan', value: 'JP' },
	{ label: 'China', value: 'CN' },
	{ label: 'India', value: 'IN' },
	{ label: 'Brazil', value: 'BR' },
	{ label: 'Argentina', value: 'AR' },
	{ label: 'South Africa', value: 'ZA' },
	{ label: 'Russia', value: 'RU' },
	{ label: 'South Korea', value: 'KR' },
	{ label: 'Indonesia', value: 'ID' },
	{ label: 'Turkey', value: 'TR' }
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

const fruits = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
	{ label: 'Date', value: 'date' },
	{ label: 'Elderberry', value: 'elderberry' },
	{ label: 'Fig', value: 'fig' },
	{ label: 'Grape', value: 'grape' }
]

export const ExampleMultiSelectLessOptions: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

	const handleChange = (value: Option[]) => {
		setSelectedOptions(value)
	}

	return (
		<div>
			<h2>Select Options</h2>
			<MultiSelect
				options={fruits}
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
