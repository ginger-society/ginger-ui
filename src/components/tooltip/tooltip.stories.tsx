import { Text } from '../typography'
import Tooltip from './Tooltip'

export const TooltipExample = () => {
	return (
		<div
			style={{
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px'
			}}
		>
			<Tooltip position="right" label={<Text>Hover over me</Text>}>
				<Text invertTheme>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, nihil
					dignissimos. Sunt
				</Text>
			</Tooltip>
			<Tooltip position="left" label={<Text>Left tooltip</Text>}>
				<Text invertTheme>Lorem ipsum dolo</Text>
			</Tooltip>
			<Tooltip position="bottom" label={<Text>Bottom tooltip</Text>}>
				<Text invertTheme>Lorem ipsum dolo</Text>
			</Tooltip>
			<Tooltip position="top" label={<Text>Top tooltip</Text>}>
				<Text invertTheme>Lorem ipsum dolo</Text>
			</Tooltip>
		</div>
	)
}
