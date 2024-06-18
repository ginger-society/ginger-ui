import React, { ReactNode, useEffect, useRef } from 'react'
import styles from './modal.module.scss'
import ModalFooter from './ModalFooter'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	preventCancelOnOverlay?: boolean
	showFooter?: boolean
	onOk?: () => void // Optional onOk handler for custom ok logic
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	preventCancelOnOverlay = false,
	showFooter = false,
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
			className={`${styles['modal']} ${isOpen ? styles['open'] : ''}`}
			onClick={handleDialogClick}
			aria-hidden="true"
		>
			{children}
			{showFooter && <ModalFooter onCancel={onClose} onOk={onOk} />}
		</dialog>
	)
}

export default Modal
