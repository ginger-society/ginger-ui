import { useState } from 'react'
import ContentEditable from './ContentEditable'

export const BasicExample = () => {
	return (
		<div style={{ padding: '20px' }}>
			<h1>Basic ContentEditable</h1>
			<ContentEditable placeholder="Enter text here..." />
		</div>
	)
}

export const WithInitialValue = () => {
	return (
		<div style={{ padding: '20px' }}>
			<h1>With Initial Value</h1>
			<ContentEditable value="Hello World" placeholder="Enter text..." />
		</div>
	)
}

export const ControlledExample = () => {
	const [value, setValue] = useState('Edit me')

	return (
		<div style={{ padding: '20px' }}>
			<h1>Controlled Component</h1>
			<ContentEditable
				value={value}
				placeholder="Enter text"
				onChange={setValue}
			/>
			<div
				style={{
					marginTop: '20px',
					padding: '12px',
					background: '#f5f5f5',
					borderRadius: '4px'
				}}
			>
				<strong>Current value:</strong> {value || '(empty)'}
			</div>
			<button
				onClick={() => setValue('Reset value')}
				style={{
					marginTop: '12px',
					padding: '8px 16px',
					borderRadius: '4px',
					border: '1px solid #ddd',
					background: 'white',
					cursor: 'pointer'
				}}
			>
				Reset Value
			</button>
		</div>
	)
}

export const NumberValidation = () => {
	const [value, setValue] = useState('')

	return (
		<div style={{ padding: '20px' }}>
			<h1>Number Only Validation</h1>
			<ContentEditable
				value={value}
				placeholder="Enter a number"
				onChange={setValue}
				validationRegex={/^\d+$/}
			/>
			<div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
				Only numbers allowed. Try entering letters to see validation error (red
				border).
			</div>
		</div>
	)
}

export const DecimalValidation = () => {
	const [value, setValue] = useState('')

	return (
		<div style={{ padding: '20px' }}>
			<h1>Decimal Number Validation</h1>
			<ContentEditable
				value={value}
				placeholder="Enter price (e.g., 10.99)"
				onChange={setValue}
				validationRegex={/^\d+(\.\d{1,2})?$/}
			/>
			<div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
				Accepts decimal numbers with up to 2 decimal places
			</div>
		</div>
	)
}

export const EmailValidation = () => {
	const [value, setValue] = useState('')

	return (
		<div style={{ padding: '20px' }}>
			<h1>Email Validation</h1>
			<ContentEditable
				value={value}
				placeholder="Enter email address"
				onChange={setValue}
				validationRegex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
			/>
			<div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
				Must be a valid email format
			</div>
		</div>
	)
}

export const CustomPadding = () => {
	return (
		<div style={{ padding: '20px' }}>
			<h1>Custom Padding</h1>
			<div style={{ marginBottom: '16px' }}>
				<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
					Default padding (4px 8px):
				</div>
				<ContentEditable placeholder="Default padding" />
			</div>
			<div style={{ marginBottom: '16px' }}>
				<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
					Large padding (12px 16px):
				</div>
				<ContentEditable placeholder="Large padding" />
			</div>
		</div>
	)
}

export const MultipleInputs = () => {
	const [firstName, setFirstName] = useState('John')
	const [lastName, setLastName] = useState('Doe')
	const [email, setEmail] = useState('')

	return (
		<div style={{ padding: '20px' }}>
			<h1>Multiple Instances</h1>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
					<h3 style={{ width: '100px', fontWeight: 'bold' }}>First Name:</h3>
					<ContentEditable
						value={firstName}
						placeholder="First name"
						onChange={setFirstName}
					/>
				</div>
				<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
					<h2 style={{ width: '100px', fontWeight: 'bold' }}>Last Name:</h2>
					<ContentEditable
						value={lastName}
						placeholder="Last name"
						onChange={setLastName}
					/>
				</div>
				<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
					<h2 style={{ width: '100px', fontWeight: 'bold' }}>Email:</h2>
					<ContentEditable
						value={email}
						placeholder="email@example.com"
						onChange={setEmail}
						validationRegex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
					/>
				</div>
				<div
					style={{
						padding: '12px',
						background: '#f5f5f5',
						borderRadius: '4px'
					}}
				>
					<strong>Full Name:</strong> {firstName} {lastName}
					<br />
					<strong>Email:</strong> {email || '(not provided)'}
				</div>
			</div>
		</div>
	)
}

export const TableExample = () => {
	const [data, setData] = useState([
		{ id: 1, product: 'Laptop', price: '1200.00', quantity: '2' },
		{ id: 2, product: 'Mouse', price: '25.99', quantity: '5' },
		{ id: 3, product: 'Keyboard', price: '89.50', quantity: '3' }
	])

	const updateCell = (id: number, field: string, value: string) => {
		setData((prev) =>
			prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
		)
	}

	return (
		<div style={{ padding: '20px' }}>
			<h1>Table Cell Editing</h1>
			<table style={{ borderCollapse: 'collapse', width: '100%' }}>
				<thead>
					<tr style={{ background: '#f5f5f5' }}>
						<th style={{ padding: '8px', border: '1px solid #ddd' }}>
							Product
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>
						<th style={{ padding: '8px', border: '1px solid #ddd' }}>
							Quantity
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd' }}>Total</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						const total = (
							parseFloat(item.price) * parseFloat(item.quantity)
						).toFixed(2)
						return (
							<tr key={item.id}>
								<td style={{ padding: '8px', border: '1px solid #ddd' }}>
									<ContentEditable
										value={item.product}
										placeholder="Product name"
										onChange={(value) => updateCell(item.id, 'product', value)}
									/>
								</td>
								<td style={{ padding: '8px', border: '1px solid #ddd' }}>
									<ContentEditable
										value={item.price}
										placeholder="0.00"
										onChange={(value) => updateCell(item.id, 'price', value)}
										validationRegex={/^\d+(\.\d{1,2})?$/}
									/>
								</td>
								<td style={{ padding: '8px', border: '1px solid #ddd' }}>
									<ContentEditable
										value={item.quantity}
										placeholder="0"
										onChange={(value) => updateCell(item.id, 'quantity', value)}
										validationRegex={/^\d+$/}
									/>
								</td>
								<td
									style={{
										padding: '8px',
										border: '1px solid #ddd',
										textAlign: 'right'
									}}
								>
									${total}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div
				style={{
					marginTop: '16px',
					fontSize: '14px',
					color: '#666'
				}}
			>
				Click on any cell to edit. Price and Quantity have validation.
			</div>
		</div>
	)
}

export const InlineEditing = () => {
	const [name, setName] = useState('John Doe')
	const [company, setCompany] = useState('Acme Corp')
	const [role, setRole] = useState('Senior Developer')

	return (
		<div style={{ padding: '20px', maxWidth: '600px' }}>
			<h1>Inline Text Editing</h1>
			<p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
				Hello, my name is{' '}
				<ContentEditable
					value={name}
					placeholder="Your name"
					onChange={setName}
				/>{' '}
				and I work at{' '}
				<ContentEditable
					value={company}
					placeholder="Company name"
					onChange={setCompany}
				/>{' '}
				as a{' '}
				<ContentEditable
					value={role}
					placeholder="Your role"
					onChange={setRole}
				/>
				. Click on any highlighted text to edit it inline.
			</p>
		</div>
	)
}

export const WithCallbacks = () => {
	const [value, setValue] = useState('')
	const [logs, setLogs] = useState<string[]>([])

	const addLog = (message: string) => {
		setLogs((prev) => [
			...prev,
			`${new Date().toLocaleTimeString()}: ${message}`
		])
	}

	return (
		<div style={{ padding: '20px' }}>
			<h1>With Callbacks</h1>
			<ContentEditable
				value={value}
				placeholder="Type something..."
				onChange={(text) => {
					setValue(text)
					addLog(`onChange: "${text}"`)
				}}
				onBlur={(text) => {
					addLog(`onBlur: "${text}"`)
				}}
			/>
			<div
				style={{
					marginTop: '20px',
					padding: '12px',
					background: '#f5f5f5',
					borderRadius: '4px',
					maxHeight: '200px',
					overflow: 'auto'
				}}
			>
				<strong>Event Logs:</strong>
				{logs.length === 0 ? (
					<div style={{ color: '#999', marginTop: '8px' }}>
						No events yet. Start typing...
					</div>
				) : (
					<div
						style={{
							marginTop: '8px',
							fontSize: '13px',
							fontFamily: 'monospace'
						}}
					>
						{logs.map((log, idx) => (
							<div key={idx}>{log}</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export const CustomStyling = () => {
	return (
		<div style={{ padding: '20px' }}>
			<style>
				{`
					.custom-editable {
						font-size: 18px;
						font-weight: 600;
						color: #2563eb;
						background: #eff6ff;
						border-radius: 8px !important;
						padding: 12px 16px !important;
					}
					.custom-editable:hover {
						background: #dbeafe;
					}
					.custom-editable:focus {
						background: white;
						box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
					}
				`}
			</style>
			<h1>Custom Styling</h1>
			<ContentEditable
				placeholder="Styled input with custom CSS"
				className="custom-editable"
			/>
			<div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
				Custom styles applied via className prop
			</div>
		</div>
	)
}

export const AllExamples = () => {
	return (
		<div>
			<BasicExample />
			<hr />
			<WithInitialValue />
			<hr />
			<ControlledExample />
			<hr />
			<NumberValidation />
			<hr />
			<DecimalValidation />
			<hr />
			<EmailValidation />
			<hr />
			<CustomPadding />
			<hr />
			<MultipleInputs />
			<hr />
			<TableExample />
			<hr />
			<InlineEditing />
			<hr />
			<WithCallbacks />
			<hr />
			<CustomStyling />
		</div>
	)
}
