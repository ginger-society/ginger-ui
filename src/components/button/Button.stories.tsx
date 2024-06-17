import { Button } from './Button'

export const Primary = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<Button primary={true} label="Button" />
			<Button primary={true} loading label="Button" />
			<Button primary={true} size="small" label="Button" />
		</div>
	)
}

export const Secondary = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<Button label="Button" />
			<Button loading label="Button" />
			<Button size="small" label="Button" />
		</div>
	)
}
