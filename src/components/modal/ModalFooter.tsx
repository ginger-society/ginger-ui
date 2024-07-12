import React from 'react'
import { Button, ButtonType } from '../button'
import styles from './modal.module.scss'

interface ModalFooterProps {
	onCancel: () => void
	onOk?: () => void
	okBtnLabel?: React.ReactNode
	cancelBtnLabel?: React.ReactNode
	okBtnType?: ButtonType
}

const ModalFooter: React.FC<ModalFooterProps> = ({
	onCancel,
	onOk,
	okBtnLabel = 'Okay',
	cancelBtnLabel = 'Cancel',
	okBtnType = ButtonType.Primary
}) => {
	return (
		<div className={styles['modal-footer']}>
			<Button type={okBtnType} label={okBtnLabel} onClick={onOk} />
			<Button label={cancelBtnLabel} onClick={onCancel} />
		</div>
	)
}

export default ModalFooter
