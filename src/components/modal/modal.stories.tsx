import { useState } from 'react'
import Modal from './Modal'
import ModalBody from './ModalBody'
import ModalHeader from './ModalHeader'

export const ModalExample = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOk = () => {
		console.log('handling ok')
		setIsOpen(false)
	}

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Open Modal</button>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				showFooter
				preventCancelOnOverlay
				onOk={handleOk}
			>
				<ModalHeader>Hello world</ModalHeader>
				<ModalBody>
					<p>
						A Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cum
						sint eius voluptas itaque obcaecati, totam ratione earum ullam
						eligendi officiis ipsum possimus sit quas accusantium voluptatibus
						natus voluptatum aperiam?
					</p>
				</ModalBody>
			</Modal>
		</div>
	)
}
