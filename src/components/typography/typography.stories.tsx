import React from 'react'
import Text, { TextColor, TextSizes, TextWeights } from './Typography'

export const TypographyExample: React.FC = () => {
	return (
		<div>
			<Text tag="h1" size={TextSizes.XLarge} color={TextColor.Primary}>
				XLarge Primary Heading
			</Text>
			<Text tag="h2" size={TextSizes.Large} color={TextColor.Danger} underline>
				Large Danger Heading with Underline
			</Text>
			<Text tag="p" size={TextSizes.Normal} color={TextColor.Success} italics>
				Normal Success Paragraph with Italics
			</Text>
			<Text
				tag="span"
				size={TextSizes.Small}
				color={TextColor.Warning}
				weight={TextWeights.Bold}
			>
				Small Warning Span with Bold
			</Text>
			<Text tag="div" size={TextSizes.Normal} color={TextColor.Info}>
				Normal Info Div
			</Text>
			<Text
				tag="p"
				size={TextSizes.Small}
				color={TextColor.Muted}
				underline
				italics
			>
				Small Muted Paragraph with Underline and Italics
			</Text>
		</div>
	)
}
