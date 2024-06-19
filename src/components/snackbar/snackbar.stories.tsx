import React from 'react'
import { SnackbarProvider, SnackbarTimer, useSnackbar } from './SnackbarContext'

const ExampleComponent: React.FC = () => {
	const { show } = useSnackbar()

	const handleShowSnackbar = (message: string, time: SnackbarTimer) => {
		show(<div> {message} </div>, time)
	}

	return (
		<div>
			<button
				onClick={() =>
					handleShowSnackbar('A short message', SnackbarTimer.Short)
				}
			>
				Show small Snackbar
			</button>
			<button
				onClick={() =>
					handleShowSnackbar('lorem ipsum dolem text', SnackbarTimer.Long)
				}
			>
				Show long Snackbar
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
