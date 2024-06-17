import Dropdown from '../dropdown'
import styles from './header.module.scss'

interface DropdownProps {
	user: {
		name: string
		email: string
	}
	onLogout: () => void
	visible: boolean
}

const HeaderDropdown = ({ user, onLogout, visible }: DropdownProps) => {
	const dropdownContent = (
		<>
			<div className={styles['user-info']}>
				<div>{user.name}</div>
				<div>{user.email}</div>
			</div>
			<button className={styles['logout-button']} onClick={onLogout}>
				Logout
			</button>
		</>
	)
	return <Dropdown visible={visible}>{dropdownContent}</Dropdown>
}

export default HeaderDropdown
