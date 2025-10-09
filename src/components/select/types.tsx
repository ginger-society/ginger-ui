export interface Option {
	label: string
	value: string
	preventAutoCompletion?: boolean
	[key: string]: unknown
}
