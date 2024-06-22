import { useState } from 'react'
import FileField from './FileField'

export const Example = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	const handleFileChange = (file: File | null) => {
		setSelectedFile(file)
	}

	return (
		<div>
			<FileField
				label="Driving License"
				onChange={handleFileChange}
				extensions={['jpg', 'png']}
			/>
		</div>
	)
}
