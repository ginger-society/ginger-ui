import React, { useEffect, useState } from 'react'
import styles from './tabs.module.scss'

interface TabProps {
	heading: JSX.Element
	children: React.ReactNode
	disabled?: boolean
	active?: boolean
}

export const Tab: React.FC<TabProps> = ({ children }) => {
	return <>{children}</>
}

interface TabsProps {
	children: React.ReactElement<TabProps>[]
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
	const [activeIndex, setActiveIndex] = useState<number>(0)

	useEffect(() => {
		const initialActiveIndex = children.findIndex((child) => child.props.active)
		if (initialActiveIndex !== -1) {
			setActiveIndex(initialActiveIndex)
		}
	}, [children])

	const handleTabClick = (index: number, disabled: boolean | undefined) => {
		if (!disabled) {
			setActiveIndex(index)
		}
	}

	return (
		<div className={styles['tabs-container']}>
			<div className={styles['tabs-header']}>
				{children.map((tab, index) => (
					<div
						key={index}
						className={`${styles['tab-heading']} ${
							index === activeIndex ? styles['active'] : ''
						} ${tab.props.disabled ? styles['disabled'] : ''}`}
						onClick={() => handleTabClick(index, tab.props.disabled)}
						aria-hidden="true"
					>
						{tab.props.heading}
					</div>
				))}
			</div>
			<div className={styles['tabs-content']}>{children[activeIndex]}</div>
		</div>
	)
}

export default Tabs
