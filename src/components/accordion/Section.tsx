import React, { ReactNode, useState } from 'react'
import styles from './accordion.module.scss'

interface SectionProps {
	head: ReactNode
	children: ReactNode
	disabled?: boolean
	open?: boolean
}

const Section: React.FC<SectionProps> = ({
	head,
	children,
	disabled = false,
	open = false
}) => {
	const [isOpen, setIsOpen] = useState(open)

	const toggleOpen = () => {
		if (!disabled) {
			setIsOpen(!isOpen)
		}
	}

	return (
		<div
			className={`${styles['section']} ${disabled ? styles['disabled'] : ''}`}
		>
			<div className={styles['header']} onClick={toggleOpen} aria-hidden>
				{head}
				{!disabled && (
					<span className={styles['icon']}>{isOpen ? '-' : '+'}</span>
				)}
			</div>
			{isOpen && <div className={styles['content']}>{children}</div>}
		</div>
	)
}

export default Section
