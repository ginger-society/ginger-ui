import SvgIcons8Close from '@src/icons/Icons8Close'
import React from 'react'
import styles from './tags.module.scss'

interface TagProps {
	label: string
	onClose: () => void
}

const Tag: React.FC<TagProps> = ({ label, onClose }) => {
	return (
		<div
			className={styles['tag']}
			onClick={(e) => e.stopPropagation()}
			aria-hidden
		>
			<span>{label}</span>
			<button onClick={onClose} className={styles['closeButton']}>
				<SvgIcons8Close fill="white" />
			</button>
		</div>
	)
}

export default Tag
