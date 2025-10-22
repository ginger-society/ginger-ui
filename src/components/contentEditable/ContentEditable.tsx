import { CSSProperties, FC, useEffect, useRef, useState } from 'react'

interface ContentEditableProps {
	value?: string
	placeholder?: string
	onChange?: (text: string) => void
	onBlur?: (text: string) => void
	padding?: string
	className?: string
	validationRegex?: RegExp
}

const ContentEditable: FC<ContentEditableProps> = ({
	value = '',
	placeholder = 'Enter text',
	onChange = () => null,
	onBlur = () => null,
	padding = '0px 0px',
	className = '',
	validationRegex
}) => {
	const [content, setContent] = useState<string>(value)
	const [isInvalid, setIsInvalid] = useState<boolean>(false)
	const pRef = useRef<HTMLParagraphElement>(null)
	const placeholderRef = useRef<HTMLParagraphElement>(null)
	const [minWidth, setMinWidth] = useState<string>('auto')

	// ✅ Update DOM only when external `value` changes
	useEffect(() => {
		if (pRef.current && pRef.current.textContent !== value) {
			pRef.current.textContent = value
			setContent(value)
		}
	}, [value])

	// Calculate min width based on placeholder
	useEffect(() => {
		if (placeholderRef.current) {
			const width = placeholderRef.current.offsetWidth
			setMinWidth(`${width}px`)
		}
	}, [placeholder])

	const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
		const text = e.currentTarget.textContent || ''
		setContent(text)
		onChange(text)
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
		e.preventDefault()
		const text = e.clipboardData.getData('text/plain')
		document.execCommand('insertText', false, text)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			pRef.current?.blur()
		}
	}

	const handleBlur = (e: React.FocusEvent<HTMLParagraphElement>) => {
		const text = e.currentTarget.textContent || ''

		// Validate against regex if provided
		if (validationRegex && text.length > 0) {
			setIsInvalid(!validationRegex.test(text))
		} else {
			setIsInvalid(false)
		}

		onBlur(text)
	}

	const containerStyle: CSSProperties = {
		display: 'inline-flex',
		alignItems: 'center',
		position: 'relative'
	}

	const placeholderPStyle: CSSProperties = {
		visibility: 'hidden',
		position: 'absolute',
		whiteSpace: 'nowrap',
		pointerEvents: 'none',
		padding,
		font: 'inherit',
		margin: 0
	}

	const editablePStyle: CSSProperties = {
		outline: 'none',
		minWidth,
		padding,
		display: 'inline-block',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		cursor: 'text',
		margin: 0,
		border: isInvalid ? '1px solid #ef4444' : '1px solid transparent',
		borderRadius: '2px',
		transition: 'border-color 0.2s'
	}

	const visiblePlaceholderStyle: CSSProperties = {
		position: 'absolute',
		color: '#999',
		pointerEvents: 'none',
		padding,
		whiteSpace: 'nowrap',
		margin: 0
	}

	return (
		<div style={containerStyle}>
			{/* Hidden placeholder to measure width */}
			<p ref={placeholderRef} style={placeholderPStyle}>
				{placeholder}
			</p>

			{/* Editable paragraph (we let DOM manage its content) */}
			<p
				ref={pRef}
				contentEditable
				suppressContentEditableWarning
				onInput={handleInput}
				onPaste={handlePaste}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				spellCheck="false"
				style={editablePStyle}
				className={className}
				role="presentation"
			/>

			{/* Placeholder when empty */}
			{!content && <p style={visiblePlaceholderStyle}>{placeholder}</p>}
		</div>
	)
}

export default ContentEditable
