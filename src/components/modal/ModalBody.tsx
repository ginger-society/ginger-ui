import React from 'react'
import styles from './modal.module.scss'

interface ModalBodyProps {
	children: React.ReactNode
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
	return <div className={styles['modal-body']}>{children}</div>
}

export default ModalBody
