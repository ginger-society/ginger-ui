import React from 'react'
import styles from './breadcrumb.module.scss'

export interface BreadcrumbItem {
	path: string
	label: string
}

interface BreadcrumbProps {
	value: BreadcrumbItem[]
	onClick: (path: string) => void
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ value, onClick }) => {
	return (
		<nav className={styles['breadcrumb']}>
			{value.map((item, index) => (
				<React.Fragment key={item.path}>
					<span
						className={styles['breadcrumb-item']}
						onClick={() => onClick(item.path)}
						style={{
							pointerEvents: index === value.length - 1 ? 'none' : 'auto'
						}}
						aria-hidden
					>
						{item.label}
					</span>
					{index < value.length - 1 && (
						<span className={styles['breadcrumb-separator']}>&gt;</span>
					)}
				</React.Fragment>
			))}
		</nav>
	)
}

export default Breadcrumb
