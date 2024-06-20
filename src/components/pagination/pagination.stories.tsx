import { useState } from 'react'
import Pagination from './Pagination'

export const Example = () => {
	const [state, setState] = useState<{ offset: number; limit: number }>({
		offset: 19,
		limit: 10
	})

	const handleOnChange = (limit: number, offset: number) => {
		setState({ offset, limit })
	}

	return (
		<>
			<Pagination
				totalRows={1100}
				initialRowsPerPage={state.limit}
				initialOffset={state.offset}
				onChange={handleOnChange}
			/>
			{JSON.stringify({ state })}
		</>
	)
}
