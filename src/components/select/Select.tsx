// Select.tsx
import React from 'react'
import { Dropdown } from '../dropdown'
import styles from './select.module.scss'

export interface Option {
	label: string
	value: string
}

interface SelectProps {
	options: Option[]
	renderer?: (option: Option) => React.ReactNode
	onChange: (value: Option) => void
	value: Option | null | undefined
}

const Select: React.FC<SelectProps> = ({
	options,
	renderer,
	onChange,
	value
}) => {
	const handleSelect = (option: Option) => {
		onChange(option)
	}

	return (
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
	)
}

export default Select
