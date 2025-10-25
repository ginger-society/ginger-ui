import { Test } from '@src/icons'
import { useState } from 'react'
import { SideMenu } from '.'

const sideMenuOptions = [
	{ id: 'home', label: <span>Home</span> },
	{ id: 'home.2', label: <span>Home</span> },
	{ id: 'home.3', label: <span>Home</span> },
	{ id: 'home.4', label: <span>Home</span> },
	{ id: 'home.5', label: <span>Home</span> },
	{ id: 'home.6', label: <span>Home</span> },
	{ id: 'home.7', label: <span>Home</span> },
	{ id: 'home.8', label: <span>Home</span> },
	{ id: 'home.9', label: <span>Home</span> },
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
				topContent={<h1>Menu</h1>}
			/>
			{/* Other content based on the selected menu item */}
		</div>
	)
}
