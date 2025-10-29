import { useOptionalTranslation } from '@src/shared/useOptionalTranslation'
import React, { useRef, useState } from 'react'
import styles from './fileField.module.scss'

interface FileFieldProps {
	label: string
	onChange: (file: File | null) => void
	extensions?: string[]
}

const FileField: React.FC<FileFieldProps> = ({
	label,
	onChange,
	extensions
}) => {
	const [fileName, setFileName] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// Use optional translation hook - returns defaults if i18n not available
	const t = useOptionalTranslation({
		'uiElement.fileField.dragDrop':
			'Click to select / Drag and drop your file here',
		'uiElement.fileField.clear': 'Clear',
		'uiElement.fileField.invalidFileType': 'Invalid file type.'
	})

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null
		if (file) {
			const fileExtension = file.name.split('.').pop()
			if (
				!extensions ||
				(fileExtension && extensions.includes(fileExtension.toLowerCase()))
			) {
				setFileName(file.name)
				onChange(file)
			} else {
				alert(t('fileField.invalidFileType'))
				event.target.value = ''
			}
		} else {
			setFileName(null)
			onChange(null)
		}
	}

	const handleClearFile = () => {
		setFileName(null)
		onChange(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		const file = event.dataTransfer.files[0]
		if (file) {
			const fileExtension = file.name.split('.').pop()
			if (
				!extensions ||
				(fileExtension && extensions.includes(fileExtension.toLowerCase()))
			) {
				setFileName(file.name)
				onChange(file)
			} else {
				alert(t('fileField.invalidFileType'))
			}
		}
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}

	return (
		<div className={styles['filefield-container']}>
			<label className={styles['label']}>{label}</label>
			<div
				className={styles['filefield']}
				onClick={handleClick}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				aria-hidden
			>
				<input
					type="file"
					accept={extensions?.map((ext) => `.${ext}`).join(',')}
					ref={fileInputRef}
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>
				<span className={styles['filefield-text']}>
					{t('fileField.dragDrop')}
				</span>
				{fileName && (
					<div className={styles['file-info']}>
						<span>{fileName}</span>
						<button
							className={styles['clear-button']}
							onClick={(e) => {
								handleClearFile()
								e.stopPropagation()
							}}
						>
							{t('fileField.clear')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default FileField

// ============================================
// Translation Structure for Consumer
// ============================================
/*
In your translation files (en.ts, hi.ts, etc.), add:

export const en = {
	fileField: {
		dragDrop: "Click to select / Drag and drop your file here",
		clear: "Clear",
		invalidFileType: "Invalid file type."
	},
	// ... other translations
}

export const hi = {
	fileField: {
		dragDrop: "चुनने के लिए क्लिक करें / अपनी फ़ाइल यहाँ खींचें और छोड़ें",
		clear: "साफ़ करें",
		invalidFileType: "अमान्य फ़ाइल प्रकार।"
	},
	// ... other translations
}

export const ta = {
	fileField: {
		dragDrop: "தேர்ந்தெடுக்க கிளிக் செய்யவும் / உங்கள் கோப்பை இங்கே இழுத்து விடவும்",
		clear: "அழி",
		invalidFileType: "தவறான கோப்பு வகை."
	},
	// ... other translations
}

export const te = {
	fileField: {
		dragDrop: "ఎంచుకోవడానికి క్లిక్ చేయండి / మీ ఫైల్‌ను ఇక్కడ లాగి వదలండి",
		clear: "తొలగించు",
		invalidFileType: "చెల్లని ఫైల్ రకం."
	},
	// ... other translations
}

export const kn = {
	fileField: {
		dragDrop: "ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ / ನಿಮ್ಮ ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಬಿಡಿ",
		clear: "ತೆರವುಗೊಳಿಸಿ",
		invalidFileType: "ಅಮಾನ್ಯ ಫೈಲ್ ಪ್ರಕಾರ."
	},
	// ... other translations
}
*/
