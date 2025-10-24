import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import styles from './contentEditable.module.scss'

interface ContentEditableProps {
	value?: string
	placeholder?: string
	onChange?: (text: string) => void
	onBlur?: (text: string) => void
	padding?: string
	className?: string
	validationRegex?: RegExp
	enableCues?: boolean
}

const ContentEditable: FC<ContentEditableProps> = ({
	value = '',
	placeholder = 'Enter text',
	onChange = () => null,
	onBlur = () => null,
	padding = '0px 0px',
	className = '',
	validationRegex,
	enableCues = true
}) => {
	const [content, setContent] = useState<string>(value)
	const [isInvalid, setIsInvalid] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState(false)
	const pRef = useRef<HTMLParagraphElement>(null)
	const placeholderRef = useRef<HTMLParagraphElement>(null)
	const [minWidth, setMinWidth] = useState<string>('auto')

	useEffect(() => {
		if (pRef.current && pRef.current.textContent !== value) {
			pRef.current.textContent = value
			setContent(value)
		}
	}, [value])

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

	const handleFocus = () => {
		setIsEditing(true)
	}

	const handleBlur = (e: React.FocusEvent<HTMLParagraphElement>) => {
		const text = e.currentTarget.textContent || ''
		setIsInvalid(
			validationRegex && text.length > 0 ? !validationRegex.test(text) : false
		)
		setIsEditing(false)
		onBlur(text)
	}

	const dynamicStyle: CSSProperties = {
		padding,
		minWidth
	}

	return (
		<div className={styles['container']}>
			<p
				ref={placeholderRef}
				className={styles['placeholderMeasure']}
				style={{ padding }}
			>
				{placeholder}
			</p>

			<div
				className={`${enableCues ? styles['hoverCueWrapper'] : ''} ${
					isEditing ? styles['editing'] : ''
				} ${isInvalid ? styles['invalid'] : ''}`}
			>
				<p
					ref={pRef}
					contentEditable
					suppressContentEditableWarning
					onInput={handleInput}
					onPaste={handlePaste}
					onKeyDown={handleKeyDown}
					onFocus={handleFocus}
					onBlur={handleBlur}
					spellCheck="false"
					className={`${styles['editable']} ${
						isInvalid ? styles['invalid'] : ''
					} ${className}`}
					style={dynamicStyle}
					role="presentation"
				/>
			</div>

			{!content && (
				<p className={styles['visiblePlaceholder']} style={{ padding }}>
					{placeholder}
				</p>
			)}
		</div>
	)
}

export default ContentEditable
