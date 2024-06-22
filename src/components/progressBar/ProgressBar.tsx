import React from 'react'
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
	value: number // Progress value in percentage
	height?: string // Height of the progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	value,
	height = '1rem'
}) => {
	return (
		<div className={styles['progressbar-container']}>
			<div className={styles['progressbar']} style={{ height: height }}>
				<div
					className={styles['progressbar-indicator']}
					style={{
						width: `${value}%`,
						animation: value === 100 ? 'none' : undefined
					}}
				></div>
			</div>
			<div className={styles['progressbar-label']}>{value}% complete</div>
		</div>
	)
}

export default ProgressBar
