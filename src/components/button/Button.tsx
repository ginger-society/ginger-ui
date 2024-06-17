import styles from './button.module.scss'

interface ButtonProps {
	primary?: boolean
	size?: 'small' | 'medium' | 'large'
	label: string
	loading?: boolean
	onClick?: () => void
}

export const Button = ({
	primary = false,
	size = 'medium',
	label,
	loading = false,
	...props
}: ButtonProps) => {
	console.log(styles)
	const mode = primary ? styles['button--primary'] : styles['button--secondary']
	return (
		<button
			type="button"
			className={[styles['button'], styles[`button--${size}`], mode].join(' ')}
			{...props}
		>
			{label} {loading && <span className={styles['loader-icon']}></span>}
		</button>
	)
}
