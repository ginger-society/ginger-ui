import React, { useState } from 'react'
import { Button, ButtonType } from '../button'
import { Checkbox } from '../checkbox'
import { Dropdown } from '../dropdown'
import { Input } from '../input'
import Tags from '../tags/Tags'
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
	label?: string
}

const MultiSelect: React.FC<SelectProps> = ({
	options,
	renderer,
	onChange,
	value,
	label
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
		<div className={styles['container']}>
			<label>{label}</label>
			<Dropdown
				label={
					<div className={styles['select']}>
						<Tags value={value} onChange={onChange} />
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
									checked={
										!!value && value.some((v) => v.value === option.value)
									}
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
		</div>
	)
}

export default MultiSelect
