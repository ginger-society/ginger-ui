import { useEffect } from 'react'
import LoadingPage from '../loadingPage'

interface HandleAuthProps {
	handleNavigation: () => void
}

const HandleLoginRedirect = ({ handleNavigation }: HandleAuthProps) => {
	useEffect(() => {
		const urlParts = location.hash.split('?')[0].split('/')

		if (urlParts[2] && urlParts[3]) {
			localStorage.setItem('access_token', urlParts[2])
			localStorage.setItem('refresh_token', urlParts[3])

			handleNavigation()
		}
	}, [handleNavigation])

	return <LoadingPage />
}

export default HandleLoginRedirect
