import { ReactNode } from 'react'
import { Avatar } from '../avatar'
import { Dropdown } from '../dropdown'
import styles from './header.module.scss'

type User = {
	name: string
	email: string
}

interface HeaderProps {
	user?: User
	icon?: ReactNode
	anonymousActions?: ReactNode
	sticky?: boolean
	brandName: string
	onLogout?: () => void
}

export const Header = ({
	brandName,
	user,
	icon,
	anonymousActions,
	sticky = true,
	onLogout
}: HeaderProps) => {
	return (
		<header className={`${styles['header']} ${sticky ? styles['sticky'] : ''}`}>
			<div className={styles['wrapper']}>
				<div>
					{icon}
					<h1>{brandName}</h1>
				</div>
				{user ? (
					<div className={styles['welcome']}>
						<Dropdown
							align="left"
							label={
								<div className={styles['avatar-container']}>
									Welcome
									<Avatar name={user.name} />
								</div>
							}
						>
							<>
								<div className={styles['user-info']}>
									<Avatar name={user.name} />
									<div>
										<div>{user.name}</div>
										<div>{user.email}</div>
									</div>
								</div>
								<button className={styles['logout-button']} onClick={onLogout}>
									Logout
								</button>
							</>
						</Dropdown>
					</div>
				) : (
					anonymousActions
				)}
			</div>
		</header>
	)
}
