import styles from './dropdown.module.scss'

interface DropdownProps {
	user: {
		name: string
		email: string
	}
	onLogout: () => void
	visible: boolean
}

const Dropdown = ({ user, onLogout, visible }: DropdownProps) => {
	return (
		<div className={styles['dropdown']}>
			{visible && (
				<div className={styles['dropdown-content']}>
					<div className={styles['user-info']}>
						<div>{user.name}</div>
						<div>{user.email}</div>
					</div>
					<button className={styles['logout-button']} onClick={onLogout}>
						Logout
					</button>
				</div>
			)}
		</div>
	)
}

export default Dropdown
