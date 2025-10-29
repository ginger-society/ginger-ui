import { useOptionalTranslation } from '@src/shared/useOptionalTranslation'
import { ReactNode, useEffect } from 'react'
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
	onSettings?: () => void
	settingsLabel?: string
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
	version,
	onSettings,
	settingsLabel
}: HeaderProps) => {
	// Use optional translation hook - returns default if i18n not available
	const t = useOptionalTranslation({
		'header.welcome': 'Welcome',
		'header.logout': 'Logout',
		'header.version': 'Version'
	})

	// Automatically detect and apply system theme if showThemeSwitcher is false
	useEffect(() => {
		if (!showThemeSwitcher) {
			const html = document.documentElement
			const applySystemTheme = () => {
				const prefersDarkScheme = window.matchMedia(
					'(prefers-color-scheme: dark)'
				).matches
				html.setAttribute('data-theme', prefersDarkScheme ? 'dark' : 'light')
			}

			applySystemTheme()

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			const handleChange = (e: MediaQueryListEvent) => {
				const newTheme = e.matches ? 'dark' : 'light'
				html.setAttribute('data-theme', newTheme)
			}
			// Watch for changes in system theme
			mediaQuery.addEventListener('change', handleChange)
			return () => {
				mediaQuery.removeEventListener('change', handleChange)
			}
		}
	}, [showThemeSwitcher])

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
							align="right"
							label={
								<div className={styles['avatar-container']}>
									{t('header.welcome')}
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
								{settingsLabel && (
									<button
										className={styles['logout-button']}
										onClick={onSettings}
									>
										{settingsLabel}
									</button>
								)}
								{version && (
									<div className={styles['version-details']}>
										{t('header.version')} : {version}
									</div>
								)}
								<button className={styles['logout-button']} onClick={onLogout}>
									{t('header.logout')}
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

// ============================================
// Translation Structure for Consumer
// ============================================
/*
In your translation files (en.ts, hi.ts, etc.), add:

export const en = {
	header: {
		welcome: "Welcome",
		logout: "Logout",
		version: "Version"
	},
	// ... other translations
}

export const hi = {
	header: {
		welcome: "स्वागत है",
		logout: "लॉगआउट",
		version: "संस्करण"
	},
	// ... other translations
}

export const ta = {
	header: {
		welcome: "வரவேற்கிறோம்",
		logout: "வெளியேறு",
		version: "பதிப்பு"
	},
	// ... other translations
}
*/
