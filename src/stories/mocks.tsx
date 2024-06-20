export const sideMenuOptions = [
	{ id: 'home', label: <span>Home</span> },
	{ id: 'accounts', label: <span>Accounts</span> },
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

export const options = [
	{ label: 'United States', value: 'US' },
	{ label: 'Canada', value: 'CA' },
	{ label: 'Mexico', value: 'MX' },
	{ label: 'United Kingdom', value: 'GB' },
	{ label: 'Germany', value: 'DE' },
	{ label: 'France', value: 'FR' },
	{ label: 'Italy', value: 'IT' },
	{ label: 'Spain', value: 'ES' },
	{ label: 'Australia', value: 'AU' },
	{ label: 'New Zealand', value: 'NZ' },
	{ label: 'Japan', value: 'JP' },
	{ label: 'China', value: 'CN' },
	{ label: 'India', value: 'IN' },
	{ label: 'Brazil', value: 'BR' },
	{ label: 'Argentina', value: 'AR' },
	{ label: 'South Africa', value: 'ZA' },
	{ label: 'Russia', value: 'RU' },
	{ label: 'South Korea', value: 'KR' },
	{ label: 'Indonesia', value: 'ID' },
	{ label: 'Turkey', value: 'TR' }
]

export const tableData = [
	{
		company: 'Alfreds Futterkiste',
		contact: 'Maria Anders',
		country: 'Germany'
	},
	{
		company: 'Centro comercial Moctezuma',
		contact: 'Francisco Chang',
		country: 'Mexico'
	},
	{
		company: 'Ernst Handel',
		contact: 'Roland Mendel',
		country: 'Austria'
	},
	{
		company: 'Island Trading',
		contact: 'Helen Bennett',
		country: 'UK'
	},
	{
		company: 'Laughing Bacchus Winecellars',
		contact: 'Yoshi Tannamuri',
		country: 'Canada'
	},
	{
		company: 'Magazzini Alimentari Riuniti',
		contact: 'Giovanni Rovelli',
		country: 'Italy'
	},
	{
		company: 'North/South',
		contact: 'Simon Crowther',
		country: 'UK'
	},
	{
		company: 'Paris spécialités',
		contact: 'Marie Bertrand',
		country: 'France'
	},
	{
		company: 'Wolski Zajazd',
		contact: 'Zbyszek',
		country: 'Poland'
	},
	{
		company: 'Berglunds snabbköp',
		contact: 'Christina Berglund',
		country: 'Sweden'
	},
	{
		company: 'Simons bistro',
		contact: 'Jytte Petersen',
		country: 'Denmark'
	},
	{
		company: 'The Big Cheese',
		contact: 'Elizabeth Brown',
		country: 'USA'
	},
	{
		company: 'Vaffeljernet',
		contact: 'Palle Ibsen',
		country: 'Norway'
	},
	{
		company: 'Wolski Zajazd',
		contact: 'Zbyszek',
		country: 'Poland'
	},
	{
		company: 'Berglunds snabbköp',
		contact: 'Christina Berglund',
		country: 'Sweden'
	}
]

export const AcmeIcon = (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="none" fillRule="evenodd">
			<path
				d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
				fill="#FFF"
			/>
			<path
				d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
				fill="#555AB9"
			/>
			<path
				d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
				fill="#91BAF8"
			/>
		</g>
	</svg>
)
