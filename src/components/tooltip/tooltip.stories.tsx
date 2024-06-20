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
			<Tooltip position="right" label={<span>Hover over me</span>}>
				<span>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, nihil
					dignissimos. Sunt
				</span>
			</Tooltip>
			<Tooltip position="left" label={<span>Left tooltip</span>}>
				<span>Lorem ipsum dolo</span>
			</Tooltip>
			<Tooltip position="bottom" label={<span>Bottom tooltip</span>}>
				<span>Lorem ipsum dolo</span>
			</Tooltip>
			<Tooltip position="top" label={<span>Top tooltip</span>}>
				<span>Lorem ipsum dolo</span>
			</Tooltip>
		</div>
	)
}
