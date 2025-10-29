// TypeAhead.tsx
import { useOptionalTranslation } from '@src/shared/useOptionalTranslation'
import React, { useEffect, useRef, useState } from 'react'
import { ContentEditable } from '../contentEditable'
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
	placeholder,
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

	// Use optional translation hook - returns defaults if i18n not available
	const t = useOptionalTranslation({
		'uiElement.typeAhead.placeholder': 'Type to search...',
		'uiElement.typeAhead.loading': 'Loading...',
		'uiElement.typeAhead.noResults': 'No results found'
	})

	// Sync query with value prop
	useEffect(() => {
		if (value) {
			// Only sync if preventAutoCompletion is not explicitly true
			if (
				!value.preventAutoCompletion ||
				value.preventAutoCompletion !== true
			) {
				setQuery(value.label || '')
			}
		} else {
			setQuery('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value?.label, value?.preventAutoCompletion])

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
			setOpen(true)
			try {
				const result = await fetchOptions(query)
				setOptions(result)
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
		if (text.length >= minChars) {
			setOpen(true)
		} else {
			setOpen(false)
		}
		// If user manually types, clear the selected value
		if (value && text !== value.label) {
			onChange(null)
		}
	}

	// Get placeholder text - use prop if provided, otherwise use translation
	const getPlaceholder = () => {
		return placeholder ?? t('uiElement.typeAhead.placeholder')
	}

	// Render input based on uiType - wrapped in a div to ensure consistent width
	const renderInputField = () => {
		let inputElement

		if (uiType === TypeAheadUIType.ContentEditable) {
			inputElement = (
				<ContentEditable
					value={query}
					placeholder={getPlaceholder()}
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
					placeholder={getPlaceholder()}
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
					placeholder={getPlaceholder()}
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
							<div className={styles['loading']}>
								{t('uiElement.typeAhead.loading')}
							</div>
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
							<div className={styles['no-results']}>
								{t('uiElement.typeAhead.noResults')}
							</div>
						)}
					</div>
				)}
			</Dropdown>
		</div>
	)
}

export default TypeAhead

// ============================================
// Translation Structure for Consumer
// ============================================
/*
In your translation files (en.ts, hi.ts, etc.), add:

export const en = {
  typeAhead: {
    placeholder: "Type to search...",
    loading: "Loading...",
    noResults: "No results found"
  },
  // ... other translations
}

export const hi = {
  typeAhead: {
    placeholder: "खोजने के लिए टाइप करें...",
    loading: "लोड हो रहा है...",
    noResults: "कोई परिणाम नहीं मिला"
  },
  // ... other translations
}

export const ta = {
  typeAhead: {
    placeholder: "தேட டைப் செய்யவும்...",
    loading: "ஏற்றுகிறது...",
    noResults: "முடிவுகள் இல்லை"
  },
  // ... other translations
}

export const te = {
  typeAhead: {
    placeholder: "శోధించడానికి టైప్ చేయండి...",
    loading: "లోడ్ అవుతోంది...",
    noResults: "ఫలితాలు కనుగొనబడలేదు"
  },
  // ... other translations
}

export const kn = {
  typeAhead: {
    placeholder: "ಹುಡುಕಲು ಟೈಪ್ ಮಾಡಿ...",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    noResults: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ"
  },
  // ... other translations
}

export const ml = {
  typeAhead: {
    placeholder: "തിരയാൻ ടൈപ്പ് ചെയ്യുക...",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    noResults: "ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല"
  },
  // ... other translations
}

export const gu = {
  typeAhead: {
    placeholder: "શોધવા માટે ટાઇપ કરો...",
    loading: "લોડ થઈ રહ્યું છે...",
    noResults: "કોઈ પરિણામો મળ્યાં નથી"
  },
  // ... other translations
}

export const bn = {
  typeAhead: {
    placeholder: "অনুসন্ধান করতে টাইপ করুন...",
    loading: "লোড হচ্ছে...",
    noResults: "কোনো ফলাফল পাওয়া যায়নি"
  },
  // ... other translations
}

export const pa = {
  typeAhead: {
    placeholder: "ਖੋਜਣ ਲਈ ਟਾਈਪ ਕਰੋ...",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    noResults: "ਕੋਈ ਨਤੀਜੇ ਨਹੀਂ ਮਿਲੇ"
  },
  // ... other translations
}

export const or = {
  typeAhead: {
    placeholder: "ଖୋଜିବା ପାଇଁ ଟାଇପ୍ କରନ୍ତୁ...",
    loading: "ଲୋଡ୍ ହେଉଛି...",
    noResults: "କୌଣସି ଫଳାଫଳ ମିଳିଲା ନାହିଁ"
  },
  // ... other translations
}

export const as = {
  typeAhead: {
    placeholder: "সন্ধান কৰিবলৈ টাইপ কৰক...",
    loading: "ল'ড হৈ আছে...",
    noResults: "কোনো ফলাফল পোৱা নগ'ল"
  },
  // ... other translations
}

export const mni = {
  typeAhead: {
    placeholder: "ꯊꯤꯕꯥ ꯇꯥꯏꯞ ꯇꯧ...",
    loading: "ꯂꯣꯗ ꯇꯧꯔꯤ...",
    noResults: "ꯔꯤꯖꯜꯇ ꯐꯪꯈ꯭ꯔꯦ"
  },
  // ... other translations
}

export const sat = {
  typeAhead: {
    placeholder: "ᱥᱮᱸᱫᱽᱨᱟ ᱞᱟᱹᱜᱤᱫ ᱴᱟᱭᱤᱯ ᱢᱮ...",
    loading: "ᱞᱳᱰ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ...",
    noResults: "ᱪᱮᱫ ᱦᱚᱸ ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ"
  },
  // ... other translations
}

export const ur = {
  typeAhead: {
    placeholder: "تلاش کرنے کے لیے ٹائپ کریں...",
    loading: "لوڈ ہو رہا ہے...",
    noResults: "کوئی نتائج نہیں ملے"
  },
  // ... other translations
}
*/
