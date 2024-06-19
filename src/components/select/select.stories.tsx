import SvgIcons8Bookmark from '@src/icons/Icons8Bookmark'
import React, { useState } from 'react'
import MultiSelect from './MultiSelect'
import Select from './Select'
import { Option } from './types'

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
		<Select
			label="A select field"
			value={selected}
			options={options}
			renderer={(option) => (
				<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
					<SvgIcons8Bookmark /> {option.label}
				</div>
			)}
			onChange={handleChange}
		/>
	)
}

export const Example: React.FC = () => {
	const handleChange = (value: Option) => {
		console.log('Selected value:', value)
		setSelected(value)
	}
	const [selected, setSelected] = useState<Option | null>(null)

	return (
		<Select
			label="Simple select"
			value={selected}
			options={options}
			onChange={handleChange}
		/>
	)
}

export const ExampleMultiSelect: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

	const handleChange = (value: Option[]) => {
		setSelectedOptions(value)
	}

	return (
		<div>
			<MultiSelect
				label={'Select multiple Options'}
				options={options}
				onChange={handleChange}
				value={selectedOptions}
			/>
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
			<MultiSelect
				label="Select from a Small list"
				options={fruits}
				onChange={handleChange}
				value={selectedOptions}
				renderer={(option) => (
					<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
						<SvgIcons8Bookmark /> {option.label}
					</div>
				)}
			/>
		</div>
	)
}
