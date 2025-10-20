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
	const [triggerWidth, setTriggerWidth] = useState(0)

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

		// Get trigger width
		if (dropdownRef.current) {
			const trigger = dropdownRef.current.firstElementChild
			if (trigger) {
				setTriggerWidth(trigger.clientWidth)
			}
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Calculate positioning based on alignment
	const getAlignmentStyle = () => {
		const dropdownWidthValue = parseInt(width, 10)
		const widthDifference = dropdownWidthValue - triggerWidth
		console.log({ dropdownWidthValue, widthDifference, align })
		if (align === 'right') {
			return { right: `-${widthDifference}px` }
		} else if (align === 'left') {
			return { left: `-${widthDifference}px` }
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
							...getAlignmentStyle()
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
