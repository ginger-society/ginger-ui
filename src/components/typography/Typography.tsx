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
	tag?: keyof JSX.IntrinsicElements
	size?: TextSize
	color?: TextColor
	children: React.ReactNode
	underline?: boolean
	italics?: boolean
	weight?: TextWeight
	invertTheme?: boolean
}

const Text: React.FC<TextProps> = ({
	tag: HTMLTag = 'span',
	size = TextSize.Normal,
	color = TextColor.Primary,
	underline = false,
	italics = false,
	weight = TextWeight.Normal,
	invertTheme = false,
	children
}) => {
	return (
		<HTMLTag
			className={`${styles[invertTheme ? 'text-inverted' : 'text']} ${
				styles[size]
			} ${styles[color]} ${underline ? styles['underline'] : ''} ${
				italics ? styles['italics'] : ''
			} ${styles[`weight-${weight}`]}`}
		>
			{children}
		</HTMLTag>
	)
}

export default Text
