import { ReactNode } from 'react'
import styles from './header.module.scss'

type User = {
	name: string
}

interface HeaderProps {
	user?: User
	icon?: ReactNode
	anonymousActions?: ReactNode
	sticky?: boolean
	brandName: string
}

export const Header = ({
	brandName,
	user,
	icon,
	anonymousActions,
	sticky = true
}: HeaderProps) => (
	<header className={`${styles['header']} ${sticky ? styles['sticky'] : ''}`}>
		<div className={styles['wrapper']}>
			<div>
				{icon}
				<h1>{brandName}</h1>
			</div>
			<div>
				{user ? (
					<span className={styles['welcome']}>
						Welcome, <b>{user.name}</b>!
					</span>
				) : (
					anonymousActions
				)}
			</div>
		</div>
	</header>
)
