// App.tsx
import React from 'react'
import { SnackbarProvider, SnackbarTimer, useSnackbar } from './SnackbarContext'

const ExampleComponent: React.FC = () => {
	const { show } = useSnackbar()

	const handleShowSnackbar = (
		message: string,
		time: SnackbarTimer,
		cancellable: boolean
	) => {
		show(<div>{message}</div>, time, cancellable)
	}

	return (
		<div>
			<button
				onClick={() =>
					handleShowSnackbar('A short message', SnackbarTimer.Short, false)
				}
			>
				Show small Snackbar
			</button>
			<button
				onClick={() =>
					handleShowSnackbar('lorem ipsum dolem text', SnackbarTimer.Long, true)
				}
			>
				Show long cancellable Snackbar
			</button>
		</div>
	)
}

export const ExampleApp: React.FC = () => {
	return (
		<SnackbarProvider>
			<ExampleComponent />
		</SnackbarProvider>
	)
}
