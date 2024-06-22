import React, { ReactNode } from 'react'
import styles from './accordion.module.scss'

interface AccordionProps {
	children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
	return <div className={styles['accordion']}>{children}</div>
}

export default Accordion
