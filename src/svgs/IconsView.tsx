import { useMemo, useState } from 'react'
import * as Icons from '../icons'
import styles from './iconsView.module.scss'

const IconsView = () => {
	const AllIcons = useMemo(() => {
		console.log(Icons)
		return Object.keys(Icons).map((key: any) => {
			return {
				Component: Icons[key],
				name: key
			}
		})
	}, [])

	const [searchQuery, setSearchQuery] = useState<string>('')

	const handleSearchInputChange = ({ target: { value } }) => {
		setSearchQuery(value)
	}

	return (
		<div className={styles['container']}>
			<span className={styles['heading']}>Icons</span>
			<input
				onChange={handleSearchInputChange}
				placeholder="Search for icons"
				className={styles['search-input']}
			/>
			<div className={styles['icons']}>
				{AllIcons.filter((icon) => {
					if (searchQuery.length > 0) {
						return icon.name.toLowerCase().includes(searchQuery.toLowerCase())
					} else {
						return true
					}
				}).map(({ Component, name }, index) => {
					return (
						<div key={index} className={styles['icon-wrapper']}>
							<Component strokeWidth="0.2" width="6rem" height="6rem" />
							<button
								className={styles['copy-to-clipboard']}
								onClick={() => {
									navigator.clipboard.writeText(
										`<${name} width="1rem" height="1rem" />`
									)
								}}
							>
								{name}
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default IconsView
