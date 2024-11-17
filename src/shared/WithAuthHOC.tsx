import { useContext } from 'react'
import LoadingPage from '@src/components/loadingPage'
import { AuthContext } from './AuthContext'

export function withAuthHOC<P extends JSX.IntrinsicAttributes>(
	WrappedComponent: React.FC<P>
): React.FC<P> {
	function WithAuth(props: P): JSX.Element {
		const { loading } = useContext(AuthContext)

		if (loading) {
			return <LoadingPage />
		} else {
			return <WrappedComponent {...props} />
		}
	}

	WithAuth.displayName = `withAuthHOC(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`

	return WithAuth
}
