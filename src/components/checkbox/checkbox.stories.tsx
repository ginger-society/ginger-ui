// ExampleCheckboxComponent.tsx
import React, { useState } from 'react'
import Checkbox from './Checkbox'

export const ExampleCheckboxComponent: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false)

	const handleChange = (checked: boolean) => {
		setIsChecked(checked)
	}

	return (
		<div>
			<Checkbox
				label="Enable notifications"
				checked={isChecked}
				onChange={handleChange}
			/>
		</div>
	)
}
