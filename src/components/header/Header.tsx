import { ReactNode } from 'react'
import { Avatar } from '../avatar'
import { Dropdown } from '../dropdown'
import styles from './header.module.scss'
import ThemeToggle from './ThemeSwitcher'

type User = {
	name: string
	email: string
}

interface HeaderProps {
	user?: User
	icon?: ReactNode
	anonymousActions?: ReactNode
	sticky?: boolean
	brandName: ReactNode
	onLogout?: () => void
	showThemeSwitcher?: boolean
	arbitaryContent?: ReactNode
	version?: string
}

export const Header = ({
	brandName,
	user,
	icon,
	anonymousActions,
	sticky = true,
	onLogout,
	showThemeSwitcher = true,
	arbitaryContent,
	version
}: HeaderProps) => {
	return (
		<header className={`${styles['header']} ${sticky ? styles['sticky'] : ''}`}>
			<div className={styles['wrapper']}>
				<div className={styles['left-section']}>
					{icon}
					<>{brandName}</>
				</div>
				{arbitaryContent}
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
								<div className={styles['version-details']}>
									Version : {version}
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
				{showThemeSwitcher && <ThemeToggle />}
			</div>
		</header>
	)
}
