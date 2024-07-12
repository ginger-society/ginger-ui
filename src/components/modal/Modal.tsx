import React, { ReactNode, useEffect, useRef } from 'react'
import { ButtonType } from '../button'
import styles from './modal.module.scss'
import ModalFooter from './ModalFooter'

export enum ModalSize {
	Medium = 'medium',
	Small = 'small',
	Large = 'large',
	XLarge = 'xlarge'
}

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	preventCancelOnOverlay?: boolean
	footerConfig?: {
		okBtnLabel?: React.ReactNode
		cancelBtnLabel?: React.ReactNode
		OkBtnType?: ButtonType
	}
	onOk?: () => void
	size?: ModalSize
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	preventCancelOnOverlay = false,
	footerConfig,
	size = ModalSize.Medium,
	onOk
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current
		if (dialog) {
			if (isOpen && !dialog.open) {
				dialog.showModal()
			} else if (!isOpen && dialog.open) {
				dialog.close()
			}
		}

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleEsc)

		return () => {
			document.removeEventListener('keydown', handleEsc)
		}
	}, [isOpen, onClose])

	const handleDialogClick = (
		event: React.MouseEvent<HTMLDialogElement, MouseEvent>
	) => {
		// Close the modal only if the click is outside the dialog content
		if (!preventCancelOnOverlay && event.currentTarget === event.target) {
			onClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			className={`${styles['modal']} ${styles[`modal-${size}`]}`}
			onClick={handleDialogClick}
			aria-hidden="true"
		>
			{children}
			{footerConfig && (
				<ModalFooter onCancel={onClose} onOk={onOk} {...footerConfig} />
			)}
		</dialog>
	)
}

export default Modal
