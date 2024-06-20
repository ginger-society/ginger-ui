import React, { useState } from 'react'
import TextArea from './TextArea'

export const TextAreaLengthExample = () => {
	const [val, setVal] = useState<string>('')
	const [inputState, setInputState] = useState<
		'danger' | 'success' | 'warning'
	>()

	const handleOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLTextAreaElement>) => {
		setVal(value)

		// Example logic to determine state based on input value
		if (value === '') {
			setInputState(undefined)
		} else if (value.length < 5) {
			setInputState('danger')
		} else if (value.length < 10) {
			setInputState('warning')
		} else {
			setInputState('success')
		}
	}

	return (
		<TextArea
			label="A lengthy textarea example"
			info={inputState}
			onChange={handleOnChange}
			placeholder="A placeholder text"
			value={val}
			state={inputState}
		/>
	)
}

export const NotesExample = () => {
	const [notes, setNotes] = useState<string>('')
	const [inputState, setInputState] = useState<
		'danger' | 'success' | 'warning'
	>()

	const handleOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(value)

		// Example logic to determine state based on input value
		if (value === '') {
			setInputState(undefined)
		} else if (value.length < 50) {
			setInputState('warning')
		} else {
			setInputState('success')
		}
	}

	return (
		<TextArea
			label="Notes"
			onChange={handleOnChange}
			placeholder="Write your notes here"
			value={notes}
			state={inputState}
		/>
	)
}

export const DescriptionExample = () => {
	const [description, setDescription] = useState<string>('')

	const handleOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(value)
	}

	return (
		<TextArea
			label="Description"
			onChange={handleOnChange}
			placeholder="Enter a description"
			value={description}
		/>
	)
}

export const CommentExample = () => {
	const [comment, setComment] = useState<string>('')

	const handleOnChange = ({
		target: { value }
	}: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(value)
	}

	return (
		<TextArea
			label="Comment"
			onChange={handleOnChange}
			placeholder="Write your comment here"
			value={comment}
		/>
	)
}
