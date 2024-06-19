import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState
} from 'react'
import Snackbar from './Snackbar'
import styles from './snackbar.module.scss'

export enum SnackbarTimer {
	Short = 2000,
	Medium = 4000,
	Long = 6000
}

interface SnackbarContextType {
	show: (component: ReactNode, duration: SnackbarTimer) => void
}

interface SnackbarItem {
	id: number
	component: ReactNode
	duration: SnackbarTimer
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
	undefined
)

let idCounter = 0

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [snackbars, setSnackbars] = useState<SnackbarItem[]>([])

	const show = useCallback((component: ReactNode, duration: SnackbarTimer) => {
		const id = idCounter++
		setSnackbars((prev) => [...prev, { id, component, duration }])

		setTimeout(() => {
			setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id))
		}, duration)
	}, [])

	return (
		<SnackbarContext.Provider value={{ show }}>
			{children}
			<div className={styles['snackbar-container']}>
				{snackbars.map((snackbar) => (
					<Snackbar
						key={snackbar.id}
						duration={snackbar.duration}
						onClose={() => {
							console.log('closing')
						}}
					>
						{snackbar.component}
					</Snackbar>
				))}
			</div>
		</SnackbarContext.Provider>
	)
}

export const useSnackbar = (): SnackbarContextType => {
	const context = useContext(SnackbarContext)
	if (!context) {
		throw new Error('useSnackbar must be used within a SnackbarProvider')
	}
	return context
}
