import { ReactNode, useEffect } from 'react'

const SystemThemePreferred = ({ children }: { children: ReactNode }) => {
	useEffect(() => {
		// Function to set the theme based on system preference
		const setTheme = (theme: 'dark' | 'light') => {
			document.documentElement.setAttribute('data-theme', theme)
		}

		// Initial theme setup
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		setTheme(mediaQuery.matches ? 'dark' : 'light')

		// Listener for theme changes
		const handleThemeChange = (event: MediaQueryListEvent) => {
			setTheme(event.matches ? 'dark' : 'light')
		}

		mediaQuery.addEventListener('change', handleThemeChange)

		// Cleanup listener on component unmount
		return () => {
			mediaQuery.removeEventListener('change', handleThemeChange)
		}
	}, [])

	return <>{children}</>
}
export default SystemThemePreferred
