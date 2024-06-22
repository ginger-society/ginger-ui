import React from 'react'
import { Text } from '../typography'
import Accordion from './Accordion'
import Section from './Section'

export const AccordionExample: React.FC = () => {
	return (
		<Accordion>
			<Section head={<Text>Heading 1</Text>} disabled>
				<Text tag="h1">Something to read</Text>
				<Text>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
					eos aspernatur unde tempora ducimus ut omnis placeat accusamus quas
					voluptates necessitatibus incidunt optio vel distinctio aperiam,
					facere enim maiores libero!
				</Text>
			</Section>

			<Section head={<Text>Heading 2</Text>} open>
				<Text tag="h1">Something to read 2</Text>
				<Text>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
					eos aspernatur unde tempora ducimus ut omnis placeat accusamus quas
					voluptates necessitatibus incidunt optio vel distinctio aperiam,
					facere enim maiores libero! - 2
				</Text>
			</Section>

			<Section head={<Text>Heading 3</Text>}>
				<Text tag="h1">Something to read 3</Text>
				<Text>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
					eos aspernatur unde tempora ducimus ut omnis placeat accusamus quas
					voluptates necessitatibus incidunt optio vel distinctio aperiam,
					facere enim maiores libero! - 3
				</Text>
			</Section>
		</Accordion>
	)
}
