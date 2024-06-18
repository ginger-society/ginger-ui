import { useState } from 'react'
import Modal from './Modal'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import ModalHeader from './ModalHeader'

export const ModalExample = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOk = () => {
		console.log('handle ok')
	}

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Open Modal</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalHeader>Hello world</ModalHeader>
				<ModalBody>
					<p>
						A Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cum
						sint eius voluptas itaque obcaecati, totam ratione earum ullam
						eligendi officiis ipsum possimus sit quas accusantium voluptatibus
						natus voluptatum aperiam?
					</p>
				</ModalBody>
				<ModalFooter onCancel={() => setIsOpen(false)} onOk={handleOk} />
			</Modal>
		</div>
	)
}
