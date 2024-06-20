import Button, { ButtonSize, ButtonType } from './Button'

export const Primary = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<Button type={ButtonType.Primary} label="Button" />
			<Button type={ButtonType.Primary} loading label="Button" />
			<Button
				type={ButtonType.Primary}
				size={ButtonSize.Small}
				label="Button"
			/>
		</div>
	)
}

export const Secondary = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<Button label="Button" />
			<Button loading label="Button" />
			<Button size={ButtonSize.Small} label="Button" />
		</div>
	)
}

export const Tertiary = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<Button type={ButtonType.Tertiary} label="Button" />
			<Button disabled type={ButtonType.Tertiary} label="Button" />
			<Button type={ButtonType.Tertiary} loading label="Button" />
			<Button
				type={ButtonType.Tertiary}
				size={ButtonSize.Small}
				label="Button"
			/>
		</div>
	)
}
