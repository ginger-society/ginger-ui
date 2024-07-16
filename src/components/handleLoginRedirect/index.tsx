import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from '../loadingPage'

interface HandleAuthProps {
	handleNavigation: () => void
}

const HandleLoginRedirect = ({ handleNavigation }: HandleAuthProps) => {
	const { access_token, refresh_token } = useParams<{
		access_token: string
		refresh_token: string
	}>()

	console.log(access_token, refresh_token)

	useEffect(() => {
		if (access_token && refresh_token) {
			localStorage.setItem('access_token', access_token)
			localStorage.setItem('refresh_token', refresh_token)

			handleNavigation()
		}
	}, [access_token, refresh_token, handleNavigation])

	return <LoadingPage />
}

export default HandleLoginRedirect
