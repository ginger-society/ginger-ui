import React from 'react'
import styles from './modal.module.scss'

interface ModalHeaderProps {
	children: React.ReactNode
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
	return <div className={styles['modal-header']}>{children}</div>
}

export default ModalHeader
