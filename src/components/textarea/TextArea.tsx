import React from 'react'
import { classNames } from '@src/utils/classNames'
import styles from './textArea.module.scss'

interface TextAreaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
	state?: 'danger' | 'success' | 'warning'
	label?: string
	info?: string
}

const TextArea: React.FC<TextAreaProps> = ({
	state,
	label,
	info,
	...props
}) => {
	return (
		<div className={styles['textarea-group']}>
			{label && <label>{label}</label>}
			<textarea
				className={classNames(styles['textarea'], state && styles[state])}
				{...props}
			/>
			{info && (
				<span className={classNames(styles['info'], state && styles[state])}>
					{info}
				</span>
			)}
		</div>
	)
}

export default TextArea
