import { useState } from 'react'
import { Pagination } from '../pagination'
import Table from './Table'

export const Example = () => {
	const [state, setState] = useState<{ offset: number; limit: number }>({
		offset: 19,
		limit: 10
	})

	const handleOnChange = (limit: number, offset: number) => {
		setState({ offset, limit })
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
			<Table>
				<thead>
					<tr>
						<th>Company</th>
						<th>Contact</th>
						<th>Country</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
					</tr>
					<tr>
						<td>Centro comercial Moctezuma</td>
						<td>Francisco Chang</td>
						<td>Mexico</td>
					</tr>
					<tr>
						<td>Ernst Handel</td>
						<td>Roland Mendel</td>
						<td>Austria</td>
					</tr>
					<tr>
						<td>Island Trading</td>
						<td>Helen Bennett</td>
						<td>UK</td>
					</tr>
					<tr>
						<td>Laughing Bacchus Winecellars</td>
						<td>Yoshi Tannamuri</td>
						<td>Canada</td>
					</tr>
					<tr>
						<td>Magazzini Alimentari Riuniti</td>
						<td>Giovanni Rovelli</td>
						<td>Italy</td>
					</tr>
					<tr>
						{' '}
						<td>North/South</td>
						<td>Simon Crowther</td>
						<td>UK</td>
					</tr>
					<tr>
						<td>Paris spécialités</td>
						<td>Marie Bertrand</td>
						<td>France</td>
					</tr>
					<tr>
						<td>Eastern Connection</td>
						<td>Ann Devon</td>
						<td>Australia</td>
					</tr>
					<tr>
						<td>Rattlesnake Canyon Grocery</td>
						<td>Paula Wilson</td>
						<td>USA</td>
					</tr>
					<tr>
						<td>Simons bistro</td>
						<td>Jytte Petersen</td>
						<td>Denmark</td>
					</tr>
					<tr>
						<td>The Big Cheese</td>
						<td>Elizabeth Brown</td>
						<td>USA</td>
					</tr>
					<tr>
						<td>Vaffeljernet</td>
						<td>Palle Ibsen</td>
						<td>Norway</td>
					</tr>
					<tr>
						<td>Wolski Zajazd</td>
						<td>Zbyszek</td>
						<td>Poland</td>
					</tr>
					<tr>
						<td>Berglunds snabbköp</td>
						<td>Christina Berglund</td>
						<td>Sweden</td>
					</tr>
				</tbody>
			</Table>
			<Pagination
				totalRows={1100}
				initialRowsPerPage={state.limit}
				initialOffset={state.offset}
				onChange={handleOnChange}
			/>
		</div>
	)
}
