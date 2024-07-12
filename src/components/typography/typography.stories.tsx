import React from 'react'
import Text, { TextColor, TextSize, TextWeight } from './Typography'

export const TypographyExample: React.FC = () => {
	return (
		<>
			<div>
				<Text tag="h1" size={TextSize.XLarge} color={TextColor.Primary}>
					XLarge Primary Heading
				</Text>
				<Text tag="h2" size={TextSize.Large} color={TextColor.Danger} underline>
					Large Danger Heading with Underline
				</Text>
				<Text tag="p" size={TextSize.Normal} color={TextColor.Success} italics>
					Normal Success Paragraph with Italics
				</Text>
				<Text
					tag="span"
					size={TextSize.Small}
					color={TextColor.Warning}
					weight={TextWeight.Bold}
				>
					Small Warning Span with Bold
				</Text>
				<Text tag="div" size={TextSize.Normal} color={TextColor.Info}>
					Normal Info Div
				</Text>
				<Text
					tag="p"
					size={TextSize.Small}
					color={TextColor.Muted}
					underline
					italics
				>
					Small Muted Paragraph with Underline and Italics
				</Text>
			</div>
			<div style={{ background: 'var(--primary-color)' }}>
				<Text
					invertTheme
					tag="h1"
					size={TextSize.XLarge}
					color={TextColor.Primary}
				>
					XLarge Primary Heading
				</Text>
				<Text
					invertTheme
					tag="h2"
					size={TextSize.Large}
					color={TextColor.Danger}
					underline
				>
					Large Danger Heading with Underline
				</Text>
				<Text
					invertTheme
					tag="p"
					size={TextSize.Normal}
					color={TextColor.Success}
					italics
				>
					Normal Success Paragraph with Italics
				</Text>
				<Text
					invertTheme
					tag="span"
					size={TextSize.Small}
					color={TextColor.Warning}
					weight={TextWeight.Bold}
				>
					Small Warning Span with Bold
				</Text>
				<Text
					invertTheme
					tag="div"
					size={TextSize.Normal}
					color={TextColor.Info}
				>
					Normal Info Div
				</Text>
			</div>
		</>
	)
}
