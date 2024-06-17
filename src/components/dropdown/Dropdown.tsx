import { ReactNode } from 'react'
import styles from './dropdown.module.scss'

interface DropdownProps {
	children: ReactNode
	visible: boolean
}

const Dropdown = ({ children, visible }: DropdownProps) => {
	return (
		<div className={styles['dropdown']}>
			{visible && <div className={styles['dropdown-content']}>{children}</div>}
		</div>
	)
}

export default Dropdown
