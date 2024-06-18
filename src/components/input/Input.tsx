import SvgIcons8Close from '@src/icons/Icons8Close'
import React, { useState } from 'react'
import { classNames } from '@src/utils/classNames'
import styles from './input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	state?: 'danger' | 'success' | 'warning'
	label?: string
	info?: string
	clearable?: boolean
	startEnhancer?: React.ReactNode
	endEnhancer?: React.ReactNode
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
					className={classNames(styles['input'], state && styles[state])}
					type={type === 'password' && showPassword ? 'text' : type}
					value={props.value}
					onChange={handleChange}
					{...props}
				/>
				{type === 'password' && (
					<span
						onClick={handleTogglePassword}
						className={styles['toggle-password']}
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
						<SvgIcons8Close fill="var(--primary-color)" />
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
