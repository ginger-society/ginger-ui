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
				alert('Invalid file type.')
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
				alert('Invalid file type.')
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
					Click to select / Drag and drop your file here
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
							Clear
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default FileField
