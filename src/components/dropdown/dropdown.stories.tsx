import { Avatar } from '../avatar'
import Dropdown from './Dropdown'

export const Example = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1>Right</h1>
			<Dropdown
				align="right"
				label={
					<div
						style={{
							cursor: 'pointer',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: '10px',
							width: '200px',
							background: 'red'
						}}
					>
						<Avatar name={'John Doe'} />
					</div>
				}
			>
				<div
					style={{
						padding: '12px 16px',
						borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
					}}
				>
					<div>John Doe</div>
					<div>john@example.com</div>
				</div>
			</Dropdown>

			<h1>Left</h1>

			<Dropdown
				align="left"
				label={
					<div
						style={{
							cursor: 'pointer',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: '10px',
							width: '200px',
							background: 'red'
						}}
					>
						<Avatar name={'John Doe'} />
					</div>
				}
			>
				<div
					style={{
						padding: '12px 16px',
						borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
					}}
				>
					<div>John Doe</div>
					<div>john@example.com</div>
				</div>
			</Dropdown>
		</div>
	)
}
