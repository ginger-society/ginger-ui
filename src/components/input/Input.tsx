import React from 'react'
import { classNames } from '@src/utils/classNames'
import styles from './input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	state?: 'danger' | 'success' | 'warning'
	label?: string
	info?: string
}

const Input: React.FC<InputProps> = ({ state, label, info, ...props }) => {
	return (
		<div className={styles['input-group']}>
			{label && <label>{label}</label>}
			<input
				className={classNames(styles['input'], state && styles[state])}
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

export default Input
