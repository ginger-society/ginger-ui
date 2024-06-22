import styles from './aside.module.scss'

const AsideWindow = ({
	isOpen,
	onClose,
	children
}: {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}) => {
	return (
		<>
			<dialog
				id=""
				className={`${styles['sliderDialog']} ${isOpen ? 'open' : ''}`}
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
