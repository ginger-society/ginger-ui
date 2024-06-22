import { useState } from 'react'
import { Text, TextSize } from '../typography'
import Aside from './Aside'

export const Example = () => {
	const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false)

	return (
		<>
			<button onClick={() => setIsSliderOpen(true)}>Open Aside</button>
			<Aside isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)}>
				<Text tag="h1" size={TextSize.Large}>
					Example heading
				</Text>
				<Text>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex id odit
					explicabo delectus in quae quisquam eveniet tempora dolor quia,
					repellat a illum maxime nobis laborum vel alias ipsam. Unde?
				</Text>
			</Aside>
		</>
	)
}
