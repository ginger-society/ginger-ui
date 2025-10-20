import { ReactNode, useEffect, useRef, useState } from 'react'
import styles from './dropdown.module.scss'

interface DropdownProps {
	children: ReactNode
	label: ReactNode
	align?: 'right' | 'left' | 'top'
	width?: string
}

const Dropdown = ({
	children,
	label,
	align = 'right',
	width = '300px'
}: DropdownProps) => {
	const [visible, setDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const toggleDropdown = () => {
		setDropdownVisible(!visible)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setDropdownVisible(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Calculate negative width for right alignment
	const getRightAlignmentStyle = () => {
		if (align === 'right') {
			// Extract numeric value from width string (e.g., "300px" -> 300)
			const widthValue = parseInt(width, 10)
			return { left: `-${widthValue}px` }
		}
		return {}
	}

	return (
		<div
			className={styles['wrapper']}
			ref={dropdownRef}
			onClick={toggleDropdown}
			aria-hidden="true"
		>
			{label}
			<div className={styles['dropdown']}>
				{visible && (
					<div
						style={{
							minWidth: width,
							...getRightAlignmentStyle()
						}}
						className={`${styles['dropdown-content']} ${
							styles[`dropdown-${align}`]
						}`}
					>
						{children}
					</div>
				)}
			</div>
		</div>
	)
}

export default Dropdown
