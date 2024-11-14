import { ConfirmationButton } from '.'
import { ButtonType } from '../button'

export const Example = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<ConfirmationButton
				type={ButtonType.Primary}
				label="Button"
				title="Are you sure?"
			/>
		</div>
	)
}
