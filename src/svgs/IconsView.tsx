import { useMemo, useState } from 'react'
import { Input } from '../components/input'
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
			<Input
				onChange={handleSearchInputChange}
				placeholder="Search for icons"
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
							<Component
								className={styles['icon']}
								strokeWidth="0.2"
								width="6rem"
								height="6rem"
							/>
							<button
								className={styles['copy-to-clipboard']}
								onClick={() => {
									navigator.clipboard.writeText(
										`<${name} width="1rem" height="1rem" />`
									)
									alert('Copied to clipboard')
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
