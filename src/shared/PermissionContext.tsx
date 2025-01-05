import { createContext, useState } from 'react'

// Common types
type PermissionType = 'isAdmin' | 'isMember'
type Permission = { isAdmin: boolean; isMember: boolean }
type Permissions = Record<string, Permission>

interface PermissionContextInterface {
	lookupPermission: (groupId: string, type: PermissionType) => Promise<boolean>
}

export const PermissionContext = createContext<PermissionContextInterface>({
	lookupPermission: () => Promise.resolve(false)
})

interface PermissionProviderProps {
	children: JSX.Element
	checkPermission: (groupId: string) => Promise<Permission>
}

export function PermissionProvider({
	children,
	checkPermission
}: PermissionProviderProps) {
	const [permissions, setPermissions] = useState<Permissions>({})
	const ongoingRequests = new Map<string, Promise<Permission>>()

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

	const value = {
		lookupPermission
	}

	return (
		<PermissionContext.Provider value={value}>
			{children}
		</PermissionContext.Provider>
	)
}
