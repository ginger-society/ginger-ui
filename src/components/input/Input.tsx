import { Icons8Close } from '@src/icons'
import React, { useState } from 'react'
import { classNames } from '@src/utils/classNames'
import styles from './input.module.scss'

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
	state?: 'danger' | 'success' | 'warning'
	label?: string
	info?: string
	clearable?: boolean
	startEnhancer?: React.ReactNode
	endEnhancer?: React.ReactNode
	type?: 'text' | 'password' | 'number'
}

const Input: React.FC<InputProps> = ({
	state,
	label,
	info,
	clearable,
	type,
	startEnhancer,
	endEnhancer,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClear = () => {
		if (props.onChange) {
			props.onChange({
				target: { value: '' }
			} as React.ChangeEvent<HTMLInputElement>)
		}
	}

	const handleTogglePassword = () => {
		setShowPassword(!showPassword)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.onChange) {
			props.onChange(e)
		}
	}

	return (
		<div className={styles['input-group']}>
			{label && <label>{label}</label>}
			<div className={styles['input-wrapper']}>
				{startEnhancer && (
					<div className={styles['start-enhancer']}>{startEnhancer}</div>
				)}
				<input
					className={classNames(
						styles['input'],
						state && styles[state],
						startEnhancer ? styles['with-start-enhancer'] : '',
						endEnhancer || (type === 'password' && !clearable)
							? styles['with-end-enhancer']
							: ''
					)}
					type={type === 'password' && showPassword ? 'text' : type}
					value={props.value}
					onChange={handleChange}
					{...props}
				/>
				{type === 'password' && (
					<span
						onClick={handleTogglePassword}
						className={classNames(
							styles['toggle-password'],
							clearable ? styles['with-clearable'] : ''
						)}
						aria-hidden="true"
					>
						{showPassword ? 'Hide' : 'Show'}
					</span>
				)}
				{clearable && props.value && (
					<span
						aria-hidden="true"
						onClick={handleClear}
						className={styles['clear-input']}
					>
						<Icons8Close fill="var(--primary-color)" />
					</span>
				)}
				{endEnhancer && (
					<div className={styles['end-enhancer']}>{endEnhancer}</div>
				)}
			</div>
			{info && (
				<span className={classNames(styles['info'], state && styles[state])}>
					{info}
				</span>
			)}
		</div>
	)
}

export default Input
