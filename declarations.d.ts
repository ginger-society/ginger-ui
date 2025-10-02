declare module '*.scss' {
	const content: Record<string, string>
	export default content
}

declare module '*.css' {
	const content: Record<string, string>
	export default content
}

declare module 'react-icons/fa' {
	import { FC, SVGAttributes } from 'react'
	const content: { [key: string]: FC<SVGAttributes<SVGElement>> }
	export = content
}
