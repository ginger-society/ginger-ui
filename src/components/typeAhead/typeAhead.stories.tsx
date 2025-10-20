// TypeAhead.stories.tsx
import SvgIcons8Bookmark from '@src/icons/Icons8Bookmark'
import React, { useState } from 'react'
import { Option } from '../select/types'
import TypeAhead from './TypeAhead'

// Mock API fetch function
const mockFetchOptions = async (query: string): Promise<Option[]> => {
	// Simulate network latency
	await new Promise((resolve) => setTimeout(resolve, 400))

	const countries: Option[] = [
		{ label: 'United States', value: 'US' },
		{ label: 'Canada', value: 'CA' },
		{ label: 'Mexico', value: 'MX' },
		{ label: 'United Kingdom', value: 'GB' },
		{ label: 'Germany', value: 'DE' },
		{ label: 'France', value: 'FR' },
		{ label: 'India', value: 'IN', preventAutoCompletion: true },
		{ label: 'Japan', value: 'JP' },
		{ label: 'Brazil', value: 'BR' },
		{ label: 'South Africa', value: 'ZA' }
	]

	// Simple filter
	return countries.filter((c) =>
		c.label.toLowerCase().includes(query.toLowerCase())
	)
}

export const Example: React.FC = () => {
	const [selected, setSelected] = useState<Option | null>(null)

	return (
		<TypeAhead
			label="Search a country"
			value={selected}
			onChange={(val) => {
				setSelected(val)
				console.log('Selected value:', val)
			}}
			fetchOptions={mockFetchOptions}
		/>
	)
}

export const ExampleWithRenderer: React.FC = () => {
	const [selected, setSelected] = useState<Option | null>(null)

	return (
		<TypeAhead
			label="Search a country with custom renderer"
			value={selected}
			onChange={(val) => {
				setSelected(val)
				console.log('Selected value:', val)
			}}
			fetchOptions={mockFetchOptions}
			renderer={(option) => (
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<SvgIcons8Bookmark /> {option.label}
				</div>
			)}
		/>
	)
}

export const ExampleSmallData: React.FC = () => {
	const [selected, setSelected] = useState<Option | null>(null)

	// Small dataset
	const fruits: Option[] = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Cherry', value: 'cherry' },
		{ label: 'Date', value: 'date' }
	]

	const fruitFetcher = async (query: string) => {
		await new Promise((resolve) => setTimeout(resolve, 200))
		return fruits.filter((f) =>
			f.label.toLowerCase().includes(query.toLowerCase())
		)
	}

	return (
		<TypeAhead
			label="Search for a fruit"
			value={selected}
			onChange={(val) => setSelected(val)}
			fetchOptions={fruitFetcher}
			renderer={(option) => (
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<SvgIcons8Bookmark /> {option.label}
				</div>
			)}
		/>
	)
}
