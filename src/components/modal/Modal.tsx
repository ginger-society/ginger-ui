import React, { ReactNode, useEffect, useRef } from 'react'
import styles from './modal.module.scss'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
		if (event.currentTarget === event.target) {
			onClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			id="sliderDialog"
			className={`${isOpen ? styles['modal'] : ''}`}
			onClick={handleDialogClick}
			aria-hidden="true"
		>
			{children}
		</dialog>
	)
}

export default Modal
