import React from 'react'
// Import your CSS module for styling
import { Loader } from '../loader'
import { Text } from '../typography'
import styles from './loadingPage.module.scss'

// Using react-icons for the spinner

const LoadingPage: React.FC = () => {
	return (
		<div className={styles['loadingPage']}>
			<Loader />
			<Text>Loading, please wait...</Text>
		</div>
	)
}

export default LoadingPage
