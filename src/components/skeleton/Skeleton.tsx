import React from 'react'
import styles from './skeleton.module.scss'

interface SkeletonProps {
	width: string | number
	height: string | number
	borderRadius?: string | number
	className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
	width,
	height,
	borderRadius = '0',
	className = ''
}) => {
	return (
		<div
			className={`${styles['skeleton']} ${className}`}
			style={{ width, height, borderRadius }}
		></div>
	)
}

export default Skeleton
