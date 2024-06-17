import React from 'react'
import styles from './input.module.scss'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => {
	return <input className={styles['input']} {...props} />
}

export default Input
