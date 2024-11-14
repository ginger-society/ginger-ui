import React from 'react'
import { Loader } from '../loader'
import styles from './button.module.scss'

// Define and export the ButtonType and ButtonSize enums
export enum ButtonType {
	Primary = 'primary',
	Secondary = 'secondary',
	Tertiary = 'tertiary',
	Danger = 'danger'
}

export enum ButtonSize {
	Small = 'small',
	Medium = 'medium',
	Large = 'large'
}

export interface ButtonProps {
	type?: ButtonType
	size?: ButtonSize
	label: React.ReactNode
	loading?: boolean
	onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	fullWidth?: boolean
	startEnhancer?: React.ReactNode
	endEnhancer?: React.ReactNode
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
	type = ButtonType.Secondary,
	size = ButtonSize.Medium,
	label,
	loading = false,
	fullWidth = false,
	startEnhancer,
	endEnhancer,
	disabled = false,
	onClick,
	...props
}) => {
	const mode = styles[`button--${type}`]
	const sizeClass = styles[`button--${size}`]

	return (
		<>
			<button
				disabled={disabled || loading}
				type="button"
				className={[
					styles['button'],
					sizeClass,
					mode,
					fullWidth ? styles['button-block'] : ''
				].join(' ')}
				onClick={(e) => {
					// if (confirmConfig) {
					// 	setConfirmOpen(true)
					// } else {
					// }
					onClick && onClick(e)
				}}
				{...props}
			>
				{startEnhancer && (
					<span className={styles['enhancer']}>{startEnhancer}</span>
				)}
				{label}
				{loading && <Loader />}
				{endEnhancer && (
					<span className={styles['enhancer']}>{endEnhancer}</span>
				)}
			</button>
		</>
	)
}

export default Button
