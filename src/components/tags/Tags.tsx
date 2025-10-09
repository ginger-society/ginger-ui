import React from 'react'
import Tag from './Tag'
import styles from './tags.module.scss'

// Ensure this path is correct

export interface Option {
	value: string
	label: string
	[key: string]: unknown
}

interface TagsProps {
	value: Option[]
	onChange: (value: Option[]) => void
}

const Tags: React.FC<TagsProps> = ({ value, onChange }) => {
	const handleRemove = (option: Option) => {
		const newValue = value.filter((v) => v.value !== option.value)
		onChange(newValue)
	}

	return (
		<div className={styles['container']}>
			{value.map((option) => (
				<Tag
					key={option.value}
					label={option.label}
					onClose={() => handleRemove(option)}
				/>
			))}
		</div>
	)
}

export default Tags
