import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../avatar'
import styles from './header.module.scss'
import HeaderDropdownContent from './headerDropdown'

type User = {
	name: string
	email: string
}

interface HeaderProps {
	user?: User
	icon?: React.ReactNode
	anonymousActions?: React.ReactNode
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
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible)
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

	return (
		<header className={`${styles['header']} ${sticky ? styles['sticky'] : ''}`}>
			<div className={styles['wrapper']}>
				<div>
					{icon}
					<h1>{brandName}</h1>
				</div>
				<div>
					{user ? (
						<div className={styles['welcome']}>
							<div
								ref={dropdownRef}
								onClick={toggleDropdown}
								className={styles['avatar-container']}
								aria-hidden="true"
							>
								Welcome <Avatar name={user.name} />
							</div>
							{onLogout && (
								<HeaderDropdownContent
									user={user}
									onLogout={onLogout}
									visible={dropdownVisible}
								/>
							)}
						</div>
					) : (
						anonymousActions
					)}
				</div>
			</div>
		</header>
	)
}
