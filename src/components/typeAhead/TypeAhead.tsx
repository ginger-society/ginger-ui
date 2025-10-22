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
	fetchOptions: (query: string) => Promise<Option[]>
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
	const inputWrapperRef = useRef<HTMLDivElement>(null)
	const [triggerHeight, setTriggerHeight] = useState(0)

	// Sync query with value prop
	useEffect(() => {
		if (value) {
			// Always sync the label, regardless of preventAutoCompletion
			// preventAutoCompletion only affects behavior after selection
			setQuery(value.label || '')
		} else {
			setQuery('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value?.label])

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
	}, [query, minChars, debounceMs, fetchOptions])

	// Update trigger height when input wrapper changes
	useEffect(() => {
		if (inputWrapperRef.current) {
			const updateHeight = () => {
				if (inputWrapperRef.current) {
					setTriggerHeight(inputWrapperRef.current.offsetHeight)
				}
			}

			updateHeight()

			// Use ResizeObserver to handle dynamic height changes
			const resizeObserver = new ResizeObserver(updateHeight)
			resizeObserver.observe(inputWrapperRef.current)

			return () => {
				resizeObserver.disconnect()
			}
		}
	}, [query, uiType])

	const handleSelect = (option: Option) => {
		onChange(option)
		if (!option.preventAutoCompletion) {
			setQuery(option.label)
		}
		setOpen(false)
	}

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
		setTimeout(() => setOpen(false), 150)
	}

	// Handle manual text changes (typing)
	const handleQueryChange = (text: string) => {
		setQuery(text)
		// If user manually types, clear the selected value
		if (value && text !== value.label) {
			onChange(null)
		}
	}

	// Render input based on uiType - wrapped in a div to ensure consistent width
	const renderInputField = () => {
		let inputElement

		if (uiType === TypeAheadUIType.ContentEditable) {
			inputElement = (
				<ContentEditable
					value={query}
					placeholder={placeholder}
					onChange={handleQueryChange}
					onBlur={handleBlur}
					className={contentEditableClassName}
				/>
			)
		} else if (uiType === TypeAheadUIType.TextArea) {
			inputElement = (
				<TextArea
					label={label}
					value={query}
					placeholder={placeholder}
					onChange={(e) => handleQueryChange(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					rows={textAreaRows}
				/>
			)
		} else {
			inputElement = (
				<Input
					value={query}
					placeholder={placeholder}
					onChange={(e) => handleQueryChange(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					clearable
				/>
			)
		}

		return (
			<div ref={inputWrapperRef} style={{ width: '100%', display: 'block' }}>
				{inputElement}
			</div>
		)
	}

	// Calculate dropdown width based on input wrapper
	const getDropdownWidth = () => {
		if (inputWrapperRef.current) {
			return `${inputWrapperRef.current.offsetWidth}px`
		}
		return '400px'
	}

	return (
		<div className={styles['container']}>
			{label && uiType !== TypeAheadUIType.TextArea && <label>{label}</label>}
			<Dropdown
				label={renderInputField()}
				align="left"
				width={getDropdownWidth()}
				triggerHeight={triggerHeight}
			>
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
