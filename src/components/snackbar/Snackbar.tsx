import SvgIcons8Close from '@src/icons/Icons8Close'
import React, { ReactNode, useEffect } from 'react'
import styles from './snackbar.module.scss'

interface SnackbarProps {
	duration: number
	onClose: () => void
	cancellable: boolean
	children: ReactNode
}

const Snackbar: React.FC<SnackbarProps> = ({
	duration,
	onClose,
	cancellable,
	children
}) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)

		return () => {
			clearTimeout(timer)
		}
	}, [duration, onClose])

	return (
		<div className={styles['snackbar']}>
			{children}
			{cancellable && (
				<button className={styles['cancel-button']} onClick={onClose}>
					<SvgIcons8Close fill="var(--primary-bg-color)" />
				</button>
			)}
		</div>
	)
}

export default Snackbar
