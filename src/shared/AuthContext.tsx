import { createContext, useCallback, useEffect, useState } from 'react'

// Common types
type PermissionType = 'isAdmin' | 'isMember'
type Permission = { isAdmin: boolean; isMember: boolean }
type Permissions = Record<string, Permission>

export interface AuthContextInterface<T> {
	isAuthenticated: boolean | null
	loading: boolean
	setIsAuthenticated?: (value: boolean) => void
	setLoading?: (value: boolean) => void
	user: T | null
	clearSession?: () => void
	checkSession?: () => Promise<void>
	lookupPermission?: (groupId: string, type: PermissionType) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextInterface<any>>({
	isAuthenticated: null,
	loading: false,
	user: null
})

// AuthProvider props
interface AuthProviderProps<T> {
	children: JSX.Element
	validateToken: () => Promise<T>
	checkPermission: (groupId: string) => Promise<Permission>
	navigateToLogin: () => void
	postLoginNavigate?: () => void // Optional navigation function after login
	appPermissionGroupId?: string // after validating the session , we will check if the user have this groups membership or not
}

export function AuthProvider<T>({
	children,
	validateToken,
	navigateToLogin,
	postLoginNavigate,
	checkPermission
}: AuthProviderProps<T>) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [permissions, setPermissions] = useState<Permissions>({})

	// Track ongoing permission requests
	const ongoingRequests = new Map<string, Promise<Permission>>()

	const clearSession = () => {
		setUser(null)
		setLoading(false)
	}

	const lookupPermission = async (groupId: string, type: PermissionType) => {
		// Return cached permission if it exists
		if (permissions[groupId]) {
			return permissions[groupId][type]
		}

		// Check if there is an ongoing request for this groupId
		if (!ongoingRequests.has(groupId)) {
			// Create and track the request
			const request = checkPermission(groupId).then((result) => {
				setPermissions((prev) => ({
					...prev,
					[groupId]: result
				}))
				ongoingRequests.delete(groupId) // Remove the request from tracking
				return result
			})
			ongoingRequests.set(groupId, request)
		}

		// Safely get the result of the ongoing or newly created request
		const request = ongoingRequests.get(groupId)
		if (!request) {
			throw new Error(`No ongoing request found for groupId: ${groupId}`)
		}

		const result = await request
		return result[type]
	}

	const checkSession = useCallback((): Promise<void> => {
		return new Promise((resolve, reject) => {
			validateToken()
				.then((userData) => {
					setIsAuthenticated(true)
					setUser(userData)
					setLoading(false)

					// Navigate post-login if function is provided
					if (postLoginNavigate && window.location.hash.length < 3) {
						postLoginNavigate()
					}

					resolve()
				})
				.catch((e) => {
					setUser(null)
					navigateToLogin()
					setIsAuthenticated(false)
					setLoading(false)
					reject(e)
				})
		})
	}, [navigateToLogin, postLoginNavigate, validateToken])

	useEffect(() => {
		if (!window.location.hash.startsWith('#/public')) {
			checkSession().catch((e) => {
				console.error('Error during session check:', e)
			})
		}
	}, [checkSession])

	const value = {
		isAuthenticated,
		setIsAuthenticated,
		loading,
		setLoading,
		user,
		clearSession,
		checkSession,
		lookupPermission
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
