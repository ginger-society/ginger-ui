// ExampleCheckboxComponent.tsx
import React, { useState } from 'react'
import Checkbox from './Checkbox'

export const ExampleCheckboxComponent: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [isWhatsappChecked, setIsWhatsappChecked] = useState(false)
	const [is2FAChecked, setIs2FAChecked] = useState(false)

	const handleChange = (checked: boolean) => {
		setIsChecked(checked)
	}

	const handleWhatsappChange = (checked: boolean) => {
		setIsWhatsappChecked(checked)
	}
	const handle2FAChange = (checked: boolean) => {
		setIs2FAChecked(checked)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<Checkbox
				label="Enable notifications"
				checked={isChecked}
				onChange={handleChange}
			/>
			<Checkbox
				label="Allow whatsapp notification"
				checked={isWhatsappChecked}
				onChange={handleWhatsappChange}
			/>
			<Checkbox
				label="Enable 2FA"
				checked={is2FAChecked}
				onChange={handle2FAChange}
			/>
		</div>
	)
}
