import { ReactNode } from 'react'
import { Avatar } from '../avatar'
import { Dropdown } from '../dropdown'
import styles from './header.module.scss'
import ThemeToggle from './ThemeSwitcher'

type User = {
	name: string
	email: string
}

export enum HeaderPositionEnum {
	Fixed = 'fixed',
	Sticky = 'sticky'
}

interface HeaderProps {
	user?: User
	icon?: ReactNode
	anonymousActions?: ReactNode
	position?: HeaderPositionEnum
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
	position = HeaderPositionEnum.Sticky,
	onLogout,
	showThemeSwitcher = true,
	arbitaryContent,
	version
}: HeaderProps) => {
	return (
		<header className={`${styles['header']} ${styles[position]}`}>
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
								{version && (
									<div className={styles['version-details']}>
										Version : {version}
									</div>
								)}
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
