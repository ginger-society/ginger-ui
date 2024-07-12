import React, { useState } from 'react'
import { Loader } from '../loader'
import { Modal, ModalBody, ModalHeader } from '../modal'
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

interface ButtonProps {
	type?: ButtonType
	size?: ButtonSize
	label: React.ReactNode
	loading?: boolean
	onClick?: () => void
	fullWidth?: boolean
	startEnhancer?: React.ReactNode
	endEnhancer?: React.ReactNode
	disabled?: boolean
	confirmConfig?: {
		title: React.ReactNode
		confirmButtonLabel?: React.ReactNode
		description?: React.ReactNode
		OkBtnType?: ButtonType
	}
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
	confirmConfig,
	onClick,
	...props
}) => {
	const mode = styles[`button--${type}`]
	const sizeClass = styles[`button--${size}`]

	const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false)

	return (
		<>
			<button
				disabled={disabled}
				type="button"
				className={[
					styles['button'],
					sizeClass,
					mode,
					fullWidth ? styles['button-block'] : ''
				].join(' ')}
				onClick={() => {
					if (confirmConfig) {
						setConfirmOpen(true)
					} else {
						onClick && onClick()
					}
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
			{confirmConfig && (
				<Modal
					isOpen={isConfirmOpen}
					onClose={() => setConfirmOpen(false)}
					footerConfig={{
						okBtnLabel: confirmConfig.confirmButtonLabel,
						OkBtnType: ButtonType.Danger
					}}
					onOk={() => {
						setConfirmOpen(false)
						onClick && onClick()
					}}
				>
					<ModalHeader>{confirmConfig.title}</ModalHeader>
					<ModalBody>{confirmConfig.description}</ModalBody>
				</Modal>
			)}
		</>
	)
}

export default Button
