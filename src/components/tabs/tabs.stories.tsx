import React from 'react'
import Tabs, { Tab } from './Tabs'

export const Example: React.FC = () => {
	return (
		<Tabs>
			<Tab disabled heading={<span>Some text</span>}>
				<h1>Heading...</h1>
				<p>Lorem ipsum etc</p>
			</Tab>

			<Tab heading={<span>Some another text</span>}>
				<h1>Heading...</h1>
				<p>Lorem ipsum etcddß</p>
			</Tab>
			<Tab active heading={<span>Some another text</span>}>
				<h1>Heading...</h1>
				<p>Lorem ipsum etcdsadsad</p>
			</Tab>
		</Tabs>
	)
}
