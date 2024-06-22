import { Test } from '@src/icons'
import { useState } from 'react'
import { SideMenu } from '.'

const sideMenuOptions = [
	{ id: 'home', label: <span>Home</span> },
	{
		id: 'accounts',
		label: (
			<span>
				<Test fill="white" stroke="white" /> Accounts
			</span>
		)
	},
	{
		id: 'finance',
		label: <span>Finance</span>,
		children: [
			{ id: 'finance.accountsPayable', label: <span>Accounts Payable</span> },
			{
				id: 'finance.accountsReceivables',
				label: <span>Accounts Receivables</span>
			}
		]
	}
]

export const Example = () => {
	const [activeItem, setActiveItem] = useState('home')

	const handleMenuChange = (newId) => {
		setActiveItem(newId)
	}

	return (
		<div>
			<SideMenu
				options={sideMenuOptions}
				active={activeItem}
				onChange={handleMenuChange}
			/>
			{/* Other content based on the selected menu item */}
		</div>
	)
}
