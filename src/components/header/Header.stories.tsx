import { AcmeIcon } from '@src/stories/mocks'
import { Button } from '../button'
import { ButtonSize } from '../button/Button'
import { Header } from './Header'

export const LoggedIn = () => {
	const handleLogout = () => {
		console.log('User logged out')
	}

	return (
		<Header
			brandName="GingerUI"
			user={{ name: 'John Doe', email: 'john.doe@example.com' }}
			icon={AcmeIcon}
			onLogout={handleLogout}
			arbitaryContent={<span>Random text</span>}
			version="0.0.1"
			settingsLabel="Profile Settings"
			onSettings={() => {
				console.log('will navigare to settings page')
			}}
		/>
	)
}

export const LoggedOut = () => {
	const anonymousActions = (
		<>
			<Button size={ButtonSize.Small} label="Login" />
		</>
	)

	return (
		<Page>
			<Header
				brandName="GingerUI"
				icon={AcmeIcon}
				anonymousActions={anonymousActions}
			/>
		</Page>
	)
}

const Page = ({ children }: { children: any }) => {
	return <div style={{ minHeight: '200vh' }}>{children}</div>
}
