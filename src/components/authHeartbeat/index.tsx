import { useEffect } from 'react'

interface AuthHeartBeatProps {
	refreshTokenFn: (refresh_token: string) => Promise<string>
}

const AuthHeartBeat = ({ refreshTokenFn }: AuthHeartBeatProps) => {
	useEffect(() => {
		setInterval(async () => {
			const refresh_token = localStorage.getItem('refresh_token')
			if (!refresh_token) {
				return
			}
			const access_token = await refreshTokenFn(refresh_token)
			localStorage.setItem('access_token', access_token)
		}, 100000) // 100 seconds
	}, [])
}

export default AuthHeartBeat
