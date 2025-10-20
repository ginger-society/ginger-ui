// TypeAhead.tsx
import React, { useEffect, useRef, useState } from 'react'
import ContentEditable from '../contentEditable'
import Dropdown from '../dropdown/Dropdown'
import Input from '../input/Input'
import { Option } from '../select/types'
import TextArea from '../textarea/TextArea'
import styles from './typeahead.module.scss'

export enum TypeAheadUIType {
	Input = 'input',
	ContentEditable = 'contentEditable',
	TextArea = 'textArea'
}

interface TypeAheadProps {
	fetchOptions: (query: string) => Promise<Option[]> // async fetch API
	renderer?: (option: Option) => React.ReactNode
	onChange: (value: Option | null) => void
	value: Option | null
	placeholder?: string
	label?: string
	minChars?: number
	debounceMs?: number
	uiType?: TypeAheadUIType
	contentEditableClassName?: string
	textAreaRows?: number
}

const TypeAhead: React.FC<TypeAheadProps> = ({
	fetchOptions,
	renderer,
	onChange,
	value,
	placeholder = 'Type to search...',
	label,
	minChars = 2,
	debounceMs = 300,
	uiType = TypeAheadUIType.Input,
	contentEditableClassName = '',
	textAreaRows = 3
}) => {
	const [query, setQuery] = useState('')
	const [options, setOptions] = useState<Option[]>([])
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const debounceRef = useRef<NodeJS.Timeout>()

	// 🔑 Keep input in sync with value
	// useEffect(() => {
	//   if (value && !value.preventAutoCompletion) {
	//     setQuery(value.label)
	//   } else {
	//     setQuery('')
	//   }
	// }, [value])

	useEffect(() => {
		if (query.length < minChars) {
			setOptions([])
			return
		}

		if (debounceRef.current) clearTimeout(debounceRef.current)

		debounceRef.current = setTimeout(async () => {
			setLoading(true)
			try {
				const result = await fetchOptions(query)
				setOptions(result)
				setOpen(true)
			} catch (err) {
				console.error('TypeAhead fetch error:', err)
				setOptions([])
			} finally {
				setLoading(false)
			}
		}, debounceMs)

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current)
		}
	}, [query])

	const handleSelect = (option: Option) => {
		onChange(option)
		if (!option.preventAutoCompletion) {
			setQuery(option.label)
		}
		setOpen(false)
	}

	// 🧩 Handle focus — reopen dropdown if query already typed
	const handleFocus = async () => {
		if (query.length >= minChars) {
			setLoading(true)
			try {
				const result = await fetchOptions(query)
				setOptions(result)
				setOpen(true)
			} catch (err) {
				console.error('TypeAhead focus fetch error:', err)
			} finally {
				setLoading(false)
			}
		}
	}

	const handleBlur = () => {
		// Optionally close dropdown after a short delay
		setTimeout(() => setOpen(false), 150)
	}

	// Render input based on uiType
	const renderInputField = () => {
		if (uiType === TypeAheadUIType.ContentEditable) {
			return (
				<ContentEditable
					value={query}
					placeholder={placeholder}
					onChange={(text) => setQuery(text)}
					onBlur={handleBlur}
					className={contentEditableClassName}
				/>
			)
		}

		if (uiType === TypeAheadUIType.TextArea) {
			return (
				<TextArea
					label={label}
					value={query}
					placeholder={placeholder}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					rows={textAreaRows}
				/>
			)
		}

		return (
			<Input
				value={query}
				placeholder={placeholder}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				clearable
			/>
		)
	}

	return (
		<div className={styles['container']}>
			{label && uiType !== TypeAheadUIType.TextArea && <label>{label}</label>}
			<Dropdown label={renderInputField()} align="right" width="400px">
				{open && (
					<div className={styles['options']}>
						{loading ? (
							<div className={styles['loading']}>Loading...</div>
						) : options.length > 0 ? (
							options.map((option) => (
								<div
									key={option.value}
									className={styles['option']}
									onClick={() => handleSelect(option)}
									aria-hidden="true"
								>
									{renderer ? renderer(option) : option.label}
								</div>
							))
						) : (
							<div className={styles['no-results']}>No results found</div>
						)}
					</div>
				)}
			</Dropdown>
		</div>
	)
}

export default TypeAhead
