import { useState } from 'react'
import Tags, { Option } from './Tags'

export const Example = () => {
	const [tags, setTags] = useState<Option[]>([
		{ value: 'val1', label: 'Label 1' },
		{ value: 'val2', label: 'Label 2' },
		{ value: 'val3', label: 'Label 3' },
		{ value: 'val4', label: 'Label 4' }
	])

	const handleTagsChange = (updatedTags: Option[]) => {
		setTags(updatedTags)
	}
	return (
		<div>
			<Tags value={tags} onChange={handleTagsChange} />
		</div>
	)
}
