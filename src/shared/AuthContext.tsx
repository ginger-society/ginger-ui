// authContext.ts
import { createContext, useCallback, useEffect, useState } from 'react'

export interface AuthContextInterface<T> {
	isAuthenticated: boolean | null
	loading: boolean
	setIsAuthenticated?: (value: boolean) => void
	setLoading?: (value: boolean) => void
	user: T | null
	clearSession?: () => void
	checkSession?: () => Promise<void>
}

export const AuthContext = createContext<AuthContextInterface<any>>({
	isAuthenticated: null,
	loading: false,
	user: null
})

interface AuthProviderProps<T> {
	children: JSX.Element
	validateToken: () => Promise<T>
	navigateToLogin: () => void
	postLoginNavigate?: () => void // Optional navigation function after login
}

export function AuthProvider<T>({
	children,
	validateToken,
	navigateToLogin,
	postLoginNavigate
}: AuthProviderProps<T>) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)

	const clearSession = () => {
		setUser(null)
		setLoading(false)
	}

	const checkSession = useCallback(async () => {
		try {
			const userData = await validateToken()
			setIsAuthenticated(true)
			setUser(userData)
			setLoading(false)

			// Navigate post-login if function is provided
			if (postLoginNavigate && window.location.hash.length < 3) {
				postLoginNavigate()
			}
		} catch (e) {
			setUser(null)
			navigateToLogin()
			setIsAuthenticated(false)
		}
	}, [navigateToLogin, postLoginNavigate, validateToken])

	useEffect(() => {
		if (!window.location.hash.startsWith('#/public')) {
			checkSession()
		}
	}, [checkSession])

	const value = {
		isAuthenticated,
		setIsAuthenticated,
		loading,
		setLoading,
		user,
		clearSession,
		checkSession
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
