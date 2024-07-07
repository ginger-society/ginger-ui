import { useEffect, useState } from 'react'
import { FaDesktop, FaMoon, FaSun } from 'react-icons/fa'
import { Dropdown } from '../dropdown'
import styles from './themeSwitcher.module.scss'

const ThemeToggle = () => {
	const getStoredTheme = () => {
		const storedTheme = localStorage.getItem('theme')
		return storedTheme ? (storedTheme as 'light' | 'dark' | 'system') : 'system'
	}

	const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(
		getStoredTheme()
	)

	useEffect(() => {
		const html = document.documentElement

		const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
			if (newTheme === 'system') {
				const prefersDarkScheme = window.matchMedia(
					'(prefers-color-scheme: dark)'
				).matches
				if (prefersDarkScheme) {
					html.setAttribute('data-theme', 'dark')
				} else {
					html.setAttribute('data-theme', 'light')
				}
			} else {
				html.setAttribute('data-theme', newTheme)
			}
			localStorage.setItem('theme', newTheme)
		}

		applyTheme(theme)

		if (theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			const handleChange = (e: MediaQueryListEvent) => {
				const newTheme = e.matches ? 'dark' : 'light'
				html.setAttribute('data-theme', newTheme)
			}
			mediaQuery.addEventListener('change', handleChange)
			return () => {
				mediaQuery.removeEventListener('change', handleChange)
			}
		}
	}, [theme])

	const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
		setTheme(newTheme)
	}

	const getCurrentThemeLabel = () => {
		switch (theme) {
			case 'light':
				return (
					<div className={styles['label-container']}>
						<FaSun /> Light
					</div>
				)
			case 'dark':
				return (
					<div className={styles['label-container']}>
						<FaMoon /> Dark
					</div>
				)
			default:
				return (
					<div className={styles['label-container']}>
						<FaDesktop /> System
					</div>
				)
		}
	}

	return (
		<Dropdown align="left" label={getCurrentThemeLabel()} width="150px">
			<div className={styles['theme-options']}>
				<button
					onClick={() => handleThemeChange('light')}
					aria-label="Light theme"
				>
					<FaSun /> Light
				</button>
				<button
					onClick={() => handleThemeChange('dark')}
					aria-label="Dark theme"
				>
					<FaMoon /> Dark
				</button>
				<button
					onClick={() => handleThemeChange('system')}
					aria-label="System theme"
				>
					<FaDesktop /> System
				</button>
			</div>
		</Dropdown>
	)
}

export default ThemeToggle
