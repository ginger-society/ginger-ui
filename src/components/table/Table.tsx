import React from 'react'
import styles from './table.module.scss'

interface TableProps {
	children: React.ReactNode
}

const Table: React.FC<TableProps> = ({ children }) => {
	return <table className={styles['table']}>{children}</table>
}

export default Table
