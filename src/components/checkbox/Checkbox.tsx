// Checkbox.tsx
import React from 'react'
import styles from './checkbox.module.scss'

interface CheckboxProps {
	label?: string
	checked: boolean
	onChange?: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(event.target.checked)
	}

	return (
		<label className={styles['checkbox']}>
			<input
				type="checkbox"
				checked={checked}
				onChange={handleChange}
				className={styles['input']}
			/>
			<span className={styles['label']}>{label}</span>
		</label>
	)
}

export default Checkbox
