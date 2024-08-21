import { useState } from 'react'
import { Text, TextSize } from '../typography'
import Aside, { ASIDE_SIZES } from './Aside'

export const Example = () => {
	const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false)
	const [size, setSize] = useState<ASIDE_SIZES>()

	return (
		<>
			<button
				onClick={() => {
					setSize(undefined)
					setIsSliderOpen(true)
				}}
			>
				Open Aside
			</button>
			<button
				onClick={() => {
					setSize(ASIDE_SIZES.MEDIUM)
					setIsSliderOpen(true)
				}}
			>
				Open medium Aside
			</button>
			<button
				onClick={() => {
					setSize(ASIDE_SIZES.LARGE)
					setIsSliderOpen(true)
				}}
			>
				Open large Aside
			</button>
			<Aside
				size={size}
				isOpen={isSliderOpen}
				onClose={() => setIsSliderOpen(false)}
			>
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
