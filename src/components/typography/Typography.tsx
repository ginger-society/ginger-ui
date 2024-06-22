import React from 'react'
import styles from './typography.module.scss'

export enum TextSizes {
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

export enum TextWeights {
	Normal = 'normal',
	Bold = 'bold'
}

interface TextProps {
	tag: keyof JSX.IntrinsicElements
	size?: TextSizes
	color?: TextColor
	children: React.ReactNode
	underline?: boolean
	italics?: boolean
	weight?: TextWeights
}

const Text: React.FC<TextProps> = ({
	tag: Tag,
	size = TextSizes.Normal,
	color = TextColor.Primary,
	underline = false,
	italics = false,
	weight = TextWeights.Normal,
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
