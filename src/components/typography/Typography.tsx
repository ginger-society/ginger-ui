import React from 'react'
import styles from './typography.module.scss'

export enum TextSize {
	XLarge = 'xlarge',
	Large = 'large',
	Normal = 'normal',
	Small = 'small'
}

export enum TextColor {
	Primary = 'primary',
	Danger = 'danger',
	Success = 'success',
	Warning = 'warning',
	Info = 'info',
	Muted = 'muted'
}

export enum TextWeight {
	Normal = 'normal',
	Bold = 'bold'
}

interface TextProps {
	tag: keyof JSX.IntrinsicElements
	size?: TextSize
	color?: TextColor
	children: React.ReactNode
	underline?: boolean
	italics?: boolean
	weight?: TextWeight
}

const Text: React.FC<TextProps> = ({
	tag: Tag,
	size = TextSize.Normal,
	color = TextColor.Primary,
	underline = false,
	italics = false,
	weight = TextWeight.Normal,
	children
}) => {
	return (
		<Tag
			className={`${styles['text']} ${styles[size]} ${styles[color]} ${
				underline ? styles['underline'] : ''
			} ${italics ? styles['italics'] : ''} ${styles[`weight-${weight}`]}`}
		>
			{children}
		</Tag>
	)
}

export default Text
