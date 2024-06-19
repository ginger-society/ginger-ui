import React from 'react'
import Skeleton from './Skeleton'

export const Example = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '20px',
				justifyContent: 'flex-start'
			}}
		>
			{[1, 2, 3, 4].map((i) => {
				return (
					<div
						style={{
							display: 'flex',
							alignItems: 'flex-start',
							padding: '16px',
							borderRadius: '8px',
							width: '400px',
							gap: '20px',
							boxSizing: 'border-box'
						}}
						key={i}
					>
						{/* Profile Picture */}
						<Skeleton width="50px" height="50px" borderRadius="50%" />

						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: '20px'
							}}
						>
							{/* Username */}
							<Skeleton width="30%" height="20px" />

							{/* Post Image */}
							<Skeleton width="100%" height="200px" />

							{/* Like and Comment Section */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<Skeleton width="20%" height="20px" />
								<Skeleton width="20%" height="20px" />
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
