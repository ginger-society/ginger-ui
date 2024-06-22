import Breadcrumb from './Breadcrumb'

const paths = [
	{ path: 'home', label: 'Home' },
	{ path: 'home/accounts', label: 'Accounts' },
	{ path: 'home/accounts/receivables', label: 'Receivables' }
]

const handleBreadcrumbClick = (path: string) => {
	console.log('Breadcrumb clicked:', path)
	// Implement navigation or any other logic here
}

export const BreadcrumbExample = () => (
	<Breadcrumb value={paths} onClick={handleBreadcrumbClick} />
)
