import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

// Adjust the import paths as needed.

enum PermissionType {
	OWNER = 'isAdmin',
	MEMBER = 'isMember'
}

interface PermissionProps {
	type: PermissionType
	groupId: string
	children: JSX.Element
}

export function Permission({ type, groupId, children }: PermissionProps) {
	const { lookupPermission, loading, isAuthenticated } = useContext(AuthContext)
	const [hasPermission, setHasPermission] = useState(false)
	const [permissionLoading, setPermissionLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		if (!isAuthenticated || loading) {
			setHasPermission(false)
			setPermissionLoading(false)
			return
		}

		setPermissionLoading(true)

		lookupPermission?.(groupId, type)
			.then((result) => {
				if (isMounted) {
					setHasPermission(result)
				}
			})
			.catch((error) => {
				console.error('Error checking permission:', error)
				if (isMounted) {
					setHasPermission(false)
				}
			})
			.finally(() => {
				if (isMounted) {
					setPermissionLoading(false)
				}
			})

		return () => {
			isMounted = false
		}
	}, [lookupPermission, groupId, type, isAuthenticated, loading])

	if (permissionLoading) {
		return null // Optionally render a loading spinner or placeholder
	}

	return hasPermission ? children : null // Render children if the user has permission
}
