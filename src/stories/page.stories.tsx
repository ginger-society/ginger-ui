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
	SideMenu,
	Tab,
	Table,
	Tabs,
	TextArea
} from '..'
import { AcmeIcon, options, sideMenuOptions, tableData } from './mocks'

export const PageExample = () => {
	const [password, setPassword] = useState<string>('')
	const [text, setText] = useState<string>('')
	const [isChecked, setIsChecked] = useState(false)
	const [selected, setSelected] = useState<Option | null>(null)

	const [activeItem, setActiveItem] = useState('home')
	const [description, setDescription] = useState<string>('')

	const handleDescriptionOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(value)
	}
	const handleMenuChange = (newId: string) => {
		setActiveItem(newId)
	}

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

	const handleOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(value)
	}
	const handleChange = (checked: boolean) => {
		setIsChecked(checked)
	}

	const handleTextOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLInputElement>) => {
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

			<div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
				<SideMenu
					options={sideMenuOptions}
					active={activeItem}
					onChange={handleMenuChange}
				/>

				<div style={{ flex: 1, padding: '20px' }}>
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
									startEnhancer={
										<SvgIcons8Document fill="var(--primary-color)" />
									}
								/>
								<Select
									label="A select field"
									value={selected}
									options={options}
									renderer={(option) => (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '20px'
											}}
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
								<TextArea
									label="Description"
									onChange={handleDescriptionOnChange}
									placeholder="Enter a description"
									value={description}
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
										{tableData.map((rowData, index) => {
											return (
												<tr key={index}>
													<td>{rowData.company}</td>
													<td>{rowData.contact}</td>
													<td>{rowData.country}</td>
												</tr>
											)
										})}
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
			</div>
		</div>
	)
}
