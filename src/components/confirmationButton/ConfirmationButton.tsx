import { useState } from 'react'
import { Button, ButtonType } from '../button'
import { ButtonProps } from '../button/Button'
import { Modal, ModalBody, ModalHeader } from '../modal'

interface ConfirmBtnProps extends ButtonProps {
	title: React.ReactNode
	confirmButtonLabel?: React.ReactNode
	description?: React.ReactNode
	okBtnType?: ButtonType
}

const ConfirmationButton = ({
	title,
	confirmButtonLabel,
	description,
	okBtnType,
	...props
}: ConfirmBtnProps) => {
	const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false)

	return (
		<>
			<Button {...props} onClick={() => setConfirmOpen(true)} />
			<Modal
				isOpen={isConfirmOpen}
				onClose={() => setConfirmOpen(false)}
				footerConfig={{
					okBtnLabel: confirmButtonLabel,
					okBtnType: okBtnType
				}}
				onOk={() => {
					setConfirmOpen(false)
					props.onClick && props.onClick()
				}}
			>
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>{description}</ModalBody>
			</Modal>
		</>
	)
}

export default ConfirmationButton
