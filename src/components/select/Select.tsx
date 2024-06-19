// Select.tsx
import React from 'react'
import { Dropdown } from '../dropdown'
import styles from './select.module.scss'
import { Option } from './types'

interface SelectProps {
	options: Option[]
	renderer?: (option: Option) => React.ReactNode
	onChange: (value: Option) => void
	value: Option | null | undefined
	label?: string
}

const Select: React.FC<SelectProps> = ({
	options,
	renderer,
	onChange,
	value,
	label
}) => {
	const handleSelect = (option: Option) => {
		onChange(option)
	}

	return (
		<div className={styles['container']}>
			<label>{label}</label>
			<Dropdown
				label={
					<div className={styles['select']}>
						{value ? value.label : 'Select an option'}
					</div>
				}
				align="left"
			>
				<div>
					{options.map((option) => (
						<div
							key={option.value}
							className={styles['select-option']}
							onClick={() => handleSelect(option)}
							aria-hidden
						>
							{renderer ? renderer(option) : option.label}
						</div>
					))}
				</div>
			</Dropdown>
		</div>
	)
}

export default Select
