import React from 'react'
import { Button, ButtonType } from '../button'
import styles from './modal.module.scss'

interface ModalFooterProps {
	onCancel: () => void
	onOk: () => void
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onCancel, onOk }) => {
	return (
		<div className={styles['modal-footer']}>
			<Button type={ButtonType.Primary} label="Ok" onClick={onOk} />
			<Button label="Cancel" onClick={onCancel} />
		</div>
	)
}

export default ModalFooter
