import React from 'react'
import { Button, ButtonType } from '../button'
import styles from './modal.module.scss'

interface ModalFooterProps {
	onCancel: () => void
	onOk?: () => void
	okBtnLabel?: React.ReactNode
	cancelBtnLabel?: React.ReactNode
	OkBtnType?: ButtonType
}

const ModalFooter: React.FC<ModalFooterProps> = ({
	onCancel,
	onOk,
	okBtnLabel = 'Okay',
	cancelBtnLabel = 'Cancel',
	OkBtnType = ButtonType.Primary
}) => {
	return (
		<div className={styles['modal-footer']}>
			<Button type={OkBtnType} label={okBtnLabel} onClick={onOk} />
			<Button label={cancelBtnLabel} onClick={onCancel} />
		</div>
	)
}

export default ModalFooter
