// TypeAhead.stories.tsx
import SvgIcons8Bookmark from '@src/icons/Icons8Bookmark'
import React, { useState } from 'react'
import { Option } from '../select/types'
import TypeAhead, { TypeAheadUIType } from './TypeAhead'

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
	return countries.filter((c) =>
		c.label.toLowerCase().includes(query.toLowerCase())
	)
}

export const AllExamples: React.FC = () => {
	// State for all examples
	const [basicSelected, setBasicSelected] = useState<Option | null>(null)
	const [rendererSelected, setRendererSelected] = useState<Option | null>(null)
	const [fruitSelected, setFruitSelected] = useState<Option | null>(null)
	const [contentEditableSelected, setContentEditableSelected] =
		useState<Option | null>(null)
	const [textAreaSelected, setTextAreaSelected] = useState<Option | null>(null)
	const [fastDebounceSelected, setFastDebounceSelected] =
		useState<Option | null>(null)
	const [minCharsSelected, setMinCharsSelected] = useState<Option | null>(null)
	const [citySelected, setCitySelected] = useState<Option | null>(null)
	const [emptySelected, setEmptySelected] = useState<Option | null>(null)
	const [tagSelected, setTagSelected] = useState<Option | null>(null)
	const [country, setCountry] = useState<Option | null>(null)
	const [fruit, setFruit] = useState<Option | null>(null)

	// Small dataset
	const fruits: Option[] = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Cherry', value: 'cherry' },
		{ label: 'Date', value: 'date' },
		{ label: 'Mango', value: 'mango' },
		{ label: 'Orange', value: 'orange' }
	]

	const fruitFetcher = async (query: string) => {
		await new Promise((resolve) => setTimeout(resolve, 200))
		return fruits.filter((f) =>
			f.label.toLowerCase().includes(query.toLowerCase())
		)
	}

	// Large dataset
	const cities: Option[] = [
		{ label: 'New York', value: 'ny' },
		{ label: 'Los Angeles', value: 'la' },
		{ label: 'Chicago', value: 'chi' },
		{ label: 'Houston', value: 'hou' },
		{ label: 'Phoenix', value: 'phx' },
		{ label: 'Philadelphia', value: 'phi' },
		{ label: 'San Antonio', value: 'sa' },
		{ label: 'San Diego', value: 'sd' },
		{ label: 'Dallas', value: 'dal' },
		{ label: 'San Jose', value: 'sj' },
		{ label: 'Austin', value: 'aus' },
		{ label: 'Jacksonville', value: 'jax' },
		{ label: 'Fort Worth', value: 'fw' },
		{ label: 'Columbus', value: 'col' },
		{ label: 'Indianapolis', value: 'ind' },
		{ label: 'Charlotte', value: 'cha' },
		{ label: 'San Francisco', value: 'sf' },
		{ label: 'Seattle', value: 'sea' },
		{ label: 'Denver', value: 'den' },
		{ label: 'Washington DC', value: 'dc' }
	]

	const cityFetcher = async (query: string) => {
		await new Promise((resolve) => setTimeout(resolve, 300))
		return cities.filter((c) =>
			c.label.toLowerCase().includes(query.toLowerCase())
		)
	}

	// Limited options
	const limitedOptions: Option[] = [
		{ label: 'Alpha', value: 'a' },
		{ label: 'Beta', value: 'b' }
	]

	const limitedFetcher = async (query: string) => {
		await new Promise((resolve) => setTimeout(resolve, 200))
		return limitedOptions.filter((o) =>
			o.label.toLowerCase().includes(query.toLowerCase())
		)
	}

	// Tags with preventAutoCompletion
	const tags: Option[] = [
		{ label: '#react', value: 'react', preventAutoCompletion: true },
		{ label: '#typescript', value: 'typescript', preventAutoCompletion: true },
		{ label: '#javascript', value: 'javascript', preventAutoCompletion: true },
		{ label: '#css', value: 'css', preventAutoCompletion: true }
	]

	const tagFetcher = async (query: string) => {
		await new Promise((resolve) => setTimeout(resolve, 200))
		return tags.filter((t) =>
			t.label.toLowerCase().includes(query.toLowerCase())
		)
	}

	return (
		<div
			style={{
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
				gap: '40px'
			}}
		>
			<h1>TypeAhead Component Examples</h1>

			{/* Example 1: Basic */}
			<section>
				<h2>1. Basic Example</h2>
				<TypeAhead
					label="Search a country"
					value={basicSelected}
					onChange={(val) => {
						setBasicSelected(val)
						console.log('Selected value:', val)
					}}
					fetchOptions={mockFetchOptions}
				/>
			</section>

			{/* Example 2: Custom Renderer */}
			<section>
				<h2>2. With Custom Renderer</h2>
				<TypeAhead
					label="Search a country with custom renderer"
					value={rendererSelected}
					onChange={(val) => {
						setRendererSelected(val)
						console.log('Selected value:', val)
					}}
					fetchOptions={mockFetchOptions}
					renderer={(option) => (
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<SvgIcons8Bookmark /> {option.label}
						</div>
					)}
				/>
			</section>

			{/* Example 3: Small Dataset */}
			<section>
				<h2>3. Small Dataset (Fruits)</h2>
				<TypeAhead
					label="Search for a fruit"
					value={fruitSelected}
					onChange={(val) => setFruitSelected(val)}
					fetchOptions={fruitFetcher}
					renderer={(option) => (
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<SvgIcons8Bookmark /> {option.label}
						</div>
					)}
				/>
			</section>

			{/* Example 4: ContentEditable UI */}
			<section>
				<h2>4. ContentEditable UI Type</h2>
				<TypeAhead
					value={contentEditableSelected}
					onChange={(val) => {
						setContentEditableSelected(val)
						console.log('Selected value:', val)
					}}
					fetchOptions={mockFetchOptions}
					uiType={TypeAheadUIType.ContentEditable}
					placeholder="Type a country name..."
				/>
			</section>

			{/* Example 5: TextArea UI */}
			<section>
				<h2>5. TextArea UI Type</h2>
				<TypeAhead
					label="Multi-line country search"
					value={textAreaSelected}
					onChange={(val) => {
						setTextAreaSelected(val)
						console.log('Selected value:', val)
					}}
					fetchOptions={mockFetchOptions}
					uiType={TypeAheadUIType.TextArea}
					textAreaRows={4}
					placeholder="Type to search countries..."
				/>
			</section>

			{/* Example 6: Fast Debounce */}
			<section>
				<h2>6. Fast Response (50ms debounce)</h2>
				<TypeAhead
					label="Fast response"
					value={fastDebounceSelected}
					onChange={(val) => setFastDebounceSelected(val)}
					fetchOptions={mockFetchOptions}
					debounceMs={50}
					placeholder="Type quickly..."
				/>
			</section>

			{/* Example 7: Min Characters */}
			<section>
				<h2>7. Minimum 4 Characters Required</h2>
				<TypeAhead
					label="Requires 4 characters minimum"
					value={minCharsSelected}
					onChange={(val) => setMinCharsSelected(val)}
					fetchOptions={mockFetchOptions}
					minChars={4}
					placeholder="Type at least 4 characters..."
				/>
			</section>

			{/* Example 8: Large Dataset */}
			<section>
				<h2>8. Large Dataset (US Cities)</h2>
				<TypeAhead
					label="Search US Cities"
					value={citySelected}
					onChange={(val) => setCitySelected(val)}
					fetchOptions={cityFetcher}
					placeholder="Start typing a city name..."
				/>
			</section>

			{/* Example 9: Empty Results */}
			<section>
				<h2>9. Empty State Handling</h2>
				<p style={{ color: '#666', fontSize: '14px' }}>
					Try typing gamma to see empty state
				</p>
				<TypeAhead
					label="Limited options"
					value={emptySelected}
					onChange={(val) => setEmptySelected(val)}
					fetchOptions={limitedFetcher}
					placeholder="Only 'Alpha' and 'Beta' available..."
				/>
			</section>

			{/* Example 10: Prevent Auto Completion */}
			<section>
				<h2>10. Prevent Auto Completion (Tags)</h2>
				<p style={{ color: '#666', fontSize: '14px' }}>
					Selected tags wont auto-fill the input
				</p>
				<TypeAhead
					label="Select tags"
					value={tagSelected}
					onChange={(val) => {
						setTagSelected(val)
						console.log('Tag selected:', val)
					}}
					fetchOptions={tagFetcher}
					placeholder="Type to find tags..."
				/>
			</section>

			{/* Example 11: Multiple Instances */}
			<section>
				<h2>11. Multiple Instances</h2>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					<TypeAhead
						label="Select a country"
						value={country}
						onChange={(val) => setCountry(val)}
						fetchOptions={mockFetchOptions}
					/>
					<TypeAhead
						label="Select a fruit"
						value={fruit}
						onChange={(val) => setFruit(val)}
						fetchOptions={fruitFetcher}
					/>
					<div
						style={{
							padding: '15px',
							background: '#f0f0f0',
							borderRadius: '4px'
						}}
					>
						<strong>Selected:</strong> Country: {country?.label || 'None'},
						Fruit: {fruit?.label || 'None'}
					</div>
				</div>
			</section>
		</div>
	)
}
