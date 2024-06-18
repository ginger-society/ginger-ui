import Loader from '../loader'
import styles from './button.module.scss'

// Define and export the ButtonType and ButtonSize enums
export enum ButtonType {
	Primary = 'primary',
	Secondary = 'secondary',
	Tertiary = 'tertiary'
}

export enum ButtonSize {
	Small = 'small',
	Medium = 'medium',
	Large = 'large'
}

interface ButtonProps {
	type?: ButtonType
	size?: ButtonSize
	label: string
	loading?: boolean
	onClick?: () => void
}

const Button = ({
	type = ButtonType.Secondary,
	size = ButtonSize.Medium,
	label,
	loading = false,
	...props
}: ButtonProps) => {
	const mode = styles[`button--${type}`]
	const sizeClass = styles[`button--${size}`]
	return (
		<button
			type="button"
			className={[styles['button'], sizeClass, mode].join(' ')}
			{...props}
		>
			{label} {loading && <Loader />}
		</button>
	)
}

export default Button
