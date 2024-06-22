import React from 'react'
import styles from './tooltip.module.scss'

interface TooltipProps {
	label: React.ReactNode
	children: React.ReactNode
	position?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: React.FC<TooltipProps> = ({
	label,
	children,
	position = 'top'
}) => {
	return (
		<div className={styles['tooltip']}>
			{label}
			<span className={`${styles['tooltiptext']} ${styles[position]}`}>
				{children}
			</span>
		</div>
	)
}

export default Tooltip
