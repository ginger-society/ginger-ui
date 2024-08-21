import styles from './aside.module.scss'

export enum ASIDE_SIZES {
	MEDIUM = 'medium',
	LARGE = 'large'
}
const AsideWindow = ({
	isOpen,
	onClose,
	size,
	children
}: {
	isOpen: boolean
	onClose: () => void
	size?: ASIDE_SIZES
	children: React.ReactNode
}) => {
	return (
		<>
			<dialog
				id=""
				className={`${styles['sliderDialog']} ${
					styles['sliderDialog-' + size]
				} ${isOpen ? 'open' : ''}`}
				open={isOpen}
			>
				{children}
			</dialog>
			{isOpen && (
				<div aria-hidden className={styles['overlay']} onClick={onClose}></div>
			)}
		</>
	)
}

export default AsideWindow
