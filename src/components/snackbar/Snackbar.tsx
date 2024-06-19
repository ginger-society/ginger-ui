// Snackbar.tsx
import React, { ReactNode, useEffect } from 'react'
import styles from './snackbar.module.scss'

interface SnackbarProps {
	duration: number
	onClose: () => void
	children: ReactNode
}

const Snackbar: React.FC<SnackbarProps> = ({ duration, onClose, children }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)

		return () => {
			clearTimeout(timer)
		}
	}, [duration, onClose])

	return <div className={styles['snackbar']}>{children}</div>
}

export default Snackbar
