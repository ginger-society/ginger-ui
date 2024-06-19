import React, { useState } from 'react'
import { Button, ButtonType } from '../button'
import { Checkbox } from '../checkbox'
import { Dropdown } from '../dropdown'
import { Input } from '../input'
import styles from './select.module.scss'

export interface Option {
	label: string
	value: string
}

const FEATURE_BREAK_COUNT = 10

interface SelectProps {
	options: Option[]
	renderer?: (option: Option) => React.ReactNode
	onChange: (value: Option[]) => void
	value: Option[]
}

const MultiSelect: React.FC<SelectProps> = ({
	options,
	renderer,
	onChange,
	value
}) => {
	const [searchTxt, setSearchTxt] = useState<string>('')

	const handleSelect = (option: Option) => {
		const newValue = value ? [...value] : []
		const index = newValue.findIndex((v) => v.value === option.value)
		if (index !== -1) {
			newValue.splice(index, 1)
		} else {
			newValue.push(option)
		}
		onChange(newValue)
	}

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTxt.toLowerCase())
	)

	return (
		<Dropdown
			label={
				<div className={styles['select']}>
					{value?.length > 0
						? value.map((v) => v.label).join(', ')
						: 'Select an option'}
				</div>
			}
			align="left"
		>
			<div
				className={
					styles[`${options.length < FEATURE_BREAK_COUNT ? 'padded' : ''}`]
				}
			>
				{options.length > FEATURE_BREAK_COUNT && (
					<div
						onClick={(e) => e.stopPropagation()}
						aria-hidden
						className={styles['action-container']}
					>
						<Input
							placeholder="Search..."
							value={searchTxt}
							onChange={({ target: { value } }) => setSearchTxt(value)}
							clearable
						/>
					</div>
				)}
				<div className={styles['options-container']}>
					{filteredOptions.map((option) => (
						<div
							key={option.value}
							className={styles['select-option']}
							onClick={(e) => {
								handleSelect(option)
								e.stopPropagation()
							}}
							aria-hidden
						>
							<Checkbox
								checked={!!value && value.some((v) => v.value === option.value)}
							/>
							{renderer ? renderer(option) : option.label}
						</div>
					))}
				</div>
				<div className={styles['action-container']}>
					<Button type={ButtonType.Primary} label="Done" fullWidth />
				</div>
			</div>
		</Dropdown>
	)
}

export default MultiSelect
