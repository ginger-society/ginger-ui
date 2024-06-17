import styles from './avatar.module.scss'

interface AvatarProps {
	name: string
}

const Avatar = ({ name }: AvatarProps) => {
	const getInitials = (name: string) => {
		const initials = name
			.split(' ')
			.map((word) => word[0])
			.join('')
		return initials.toUpperCase()
	}

	return <div className={styles['avatar']}>{getInitials(name)}</div>
}

export default Avatar
