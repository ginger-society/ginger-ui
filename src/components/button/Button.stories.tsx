import { Button } from './Button'

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = () => {
	return <Button primary={true} label="Button" />
}

export const Secondary = () => {
	return <Button label="Button" />
}

export const Large = () => {
	return <Button label="Button" size="large" />
}

export const Small = () => {
	return <Button label="Button" size="small" />
}
