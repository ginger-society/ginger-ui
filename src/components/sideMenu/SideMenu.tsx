import { ReactNode, useEffect, useState } from 'react'
import styles from './sideMenu.module.scss'

interface MenuItem {
	id: string
	label: ReactNode
	children?: MenuItem[]
}

interface SideMenuProps {
	options: MenuItem[]
	active: string
	onChange: (newId: string) => void
	topContent?: ReactNode // 👈 new optional prop for arbitrary top content
}

const SideMenu = ({ options, active, onChange, topContent }: SideMenuProps) => {
	const [expandedItems, setExpandedItems] = useState<{
		[key: string]: boolean
	}>({})

	useEffect(() => {
		const activeItem = findActiveItem(options, active)
		if (activeItem) {
			setExpandedItems((prev) => ({
				...prev,
				...getParentIds(options, activeItem.id)
			}))
		}
	}, [active, options])

	const findActiveItem = (
		items: MenuItem[],
		activeId: string
	): MenuItem | null => {
		for (const item of items) {
			if (item.id === activeId) return item
			if (item.children) {
				const activeChild = findActiveItem(item.children, activeId)
				if (activeChild) return activeChild
			}
		}
		return null
	}

	const getParentIds = (
		items: MenuItem[],
		activeId: string
	): { [key: string]: boolean } => {
		const result: { [key: string]: boolean } = {}
		for (const item of items) {
			if (
				item.children &&
				item.children.some(
					(child) =>
						child.id === activeId ||
						getParentIds(child.children || [], activeId)[child.id]
				)
			) {
				result[item.id] = true
				Object.assign(result, getParentIds(item.children, activeId))
			}
		}
		return result
	}

	const handleClick = (id: string, hasChildren: boolean) => {
		if (hasChildren) {
			setExpandedItems((prev) => ({
				...prev,
				[id]: !prev[id]
			}))
			return
		}
		onChange(id)
	}

	const renderMenuItems = (items: MenuItem[]) =>
		items.map((item) => {
			const isActive = item.id === active
			const isExpanded =
				expandedItems[item.id] ||
				(item.children && item.children.some((child) => child.id === active))

			return (
				<li
					key={item.id}
					className={`${styles['menu-item']} ${
						!item.children ? styles['hover'] : ''
					} ${isActive ? styles['active'] : ''}`}
					onClick={() => handleClick(item.id, !!item.children)}
					aria-hidden
				>
					{item.label}
					{item.children && isExpanded && (
						<ul className={styles['sub-menu']}>
							{renderMenuItems(item.children)}
						</ul>
					)}
				</li>
			)
		})

	return (
		<div className={styles['side-menu-container']}>
			{topContent && <div className={styles['top-content']}>{topContent}</div>}
			<ul className={styles['menu']}>{renderMenuItems(options)}</ul>
		</div>
	)
}

export default SideMenu
