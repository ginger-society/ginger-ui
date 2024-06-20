import SvgIcons8Bookmark from '@src/icons/Icons8Bookmark'
import SvgIcons8Document from '@src/icons/Icons8Document'
import SvgIcons8Refresh from '@src/icons/Icons8Refresh'
import { useState } from 'react'
import {
	Button,
	ButtonType,
	Checkbox,
	Header,
	Input,
	MultiSelect,
	Option,
	Pagination,
	Select,
	Tab,
	Table,
	Tabs
} from '..'

const options = [
	{ label: 'United States', value: 'US' },
	{ label: 'Canada', value: 'CA' },
	{ label: 'Mexico', value: 'MX' },
	{ label: 'United Kingdom', value: 'GB' },
	{ label: 'Germany', value: 'DE' },
	{ label: 'France', value: 'FR' },
	{ label: 'Italy', value: 'IT' },
	{ label: 'Spain', value: 'ES' },
	{ label: 'Australia', value: 'AU' },
	{ label: 'New Zealand', value: 'NZ' },
	{ label: 'Japan', value: 'JP' },
	{ label: 'China', value: 'CN' },
	{ label: 'India', value: 'IN' },
	{ label: 'Brazil', value: 'BR' },
	{ label: 'Argentina', value: 'AR' },
	{ label: 'South Africa', value: 'ZA' },
	{ label: 'Russia', value: 'RU' },
	{ label: 'South Korea', value: 'KR' },
	{ label: 'Indonesia', value: 'ID' },
	{ label: 'Turkey', value: 'TR' }
]

const AcmeIcon = (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="none" fillRule="evenodd">
			<path
				d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
				fill="#FFF"
			/>
			<path
				d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
				fill="#555AB9"
			/>
			<path
				d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
				fill="#91BAF8"
			/>
		</g>
	</svg>
)

export const FormExample = () => {
	const [password, setPassword] = useState<string>('')
	const [text, setText] = useState<string>('')
	const [isChecked, setIsChecked] = useState(false)
	const [selected, setSelected] = useState<Option | null>(null)

	const [selectedMultiOptions, setMultiSelectedOptions] = useState<Option[]>([])
	const [state, setState] = useState<{ offset: number; limit: number }>({
		offset: 19,
		limit: 10
	})

	const handlePaginationOnChange = (limit: number, offset: number) => {
		setState({ offset, limit })
	}
	const handleMultiSelectChange = (value: Option[]) => {
		setMultiSelectedOptions(value)
	}
	const handleSelectChange = (value: Option) => {
		console.log('Selected value:', value)
		setSelected(value)
	}

	const handleOnChange = ({ target: { value } }) => {
		setPassword(value)
	}
	const handleChange = (checked: boolean) => {
		setIsChecked(checked)
	}

	const handleTextOnChange = ({ target: { value } }) => {
		setText(value)
	}

	const handleLogout = () => {
		console.log('User logged out')
	}

	return (
		<div>
			<Header
				brandName="GingerUI"
				user={{ name: 'John Doe', email: 'john.doe@example.com' }}
				icon={AcmeIcon}
				onLogout={handleLogout}
			/>

			<Tabs>
				<Tab heading={<span>Form</span>}>
					<div
						style={{
							width: '500px',
							display: 'flex',
							gap: '20px',
							flexDirection: 'column',
							padding: '50px'
						}}
					>
						<Input
							label="Text Input Example"
							onChange={handleTextOnChange}
							placeholder="Enter a value"
							value={text}
							type="text"
							endEnhancer={<SvgIcons8Refresh fill="var(--primary-color)" />}
							startEnhancer={<SvgIcons8Document fill="var(--primary-color)" />}
						/>
						<Select
							label="A select field"
							value={selected}
							options={options}
							renderer={(option) => (
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
								>
									<SvgIcons8Bookmark /> {option.label}
								</div>
							)}
							onChange={handleSelectChange}
						/>
						<Input
							label="Text Input Example"
							id="email"
							onChange={handleOnChange}
							placeholder="Enter a value"
							value={password}
							type="password"
							clearable={true}
						/>
						<MultiSelect
							label={'Select multiple Options'}
							options={options}
							onChange={handleMultiSelectChange}
							value={selectedMultiOptions}
						/>
						<Checkbox
							label="Enable notifications"
							checked={isChecked}
							onChange={handleChange}
						/>

						<Button label="Save" type={ButtonType.Primary} />
					</div>
				</Tab>

				<Tab disabled heading={<span>Some another text</span>}>
					<h1>Heading...</h1>
					<p>Lorem ipsum etcddß</p>
				</Tab>
				<Tab active heading={<span>Some another text</span>}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '40px',
							padding: '20px'
						}}
					>
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
									<td>Wolski Zajazd</td>
									<td>Zbyszek</td>
									<td>Poland</td>
								</tr>
								<tr>
									<td>Berglunds snabbköp</td>
									<td>Christina Berglund</td>
									<td>Sweden</td>
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
							onChange={handlePaginationOnChange}
						/>
					</div>
				</Tab>
			</Tabs>
		</div>
	)
}
