import { useEffect, useState } from 'react'
import { Button, ButtonType } from '../button'
import { Dropdown } from '../dropdown'
import styles from './pagination.module.scss'

interface PaginationProps {
	totalRows: number
	initialRowsPerPage?: number
	initialOffset?: number
	onChange: (limit: number, offset: number) => void
}

const Pagination = ({
	totalRows,
	initialRowsPerPage = 10,
	initialOffset = 0,
	onChange
}: PaginationProps) => {
	const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage)
	const [currentPage, setCurrentPage] = useState<number>(
		Math.floor(initialOffset / initialRowsPerPage) + 1
	)

	const totalPages = Math.ceil(totalRows / rowsPerPage)

	useEffect(() => {
		onChange(rowsPerPage, (currentPage - 1) * rowsPerPage)
	}, [rowsPerPage, currentPage, onChange])

	const handleRowsPerPageChange = (newRowsPerPage: number) => {
		setRowsPerPage(newRowsPerPage)
		setCurrentPage(1) // Reset to the first page whenever rows per page change
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	return (
		<div className={styles['container']}>
			<Dropdown
				align="left"
				width="150px"
				label={
					<Button
						label={`${rowsPerPage} Rows per page`}
						type={ButtonType.Tertiary}
						endEnhancer={<>&darr;</>}
					/>
				}
			>
				<ul className={styles['list']}>
					{[10, 20, 30, 50].map((rows) => (
						<li
							key={rows}
							onClick={() => handleRowsPerPageChange(rows)}
							className={styles['list-item']}
							aria-hidden
						>
							{rows} rows
						</li>
					))}
				</ul>
			</Dropdown>

			<div className={styles['controls-container']}>
				<Button
					type={ButtonType.Tertiary}
					label="Prev"
					startEnhancer={<>&lt;</>}
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				/>
				<Dropdown
					align="left"
					width="100px"
					label={
						<Button
							label={`Page ${currentPage}`}
							type={ButtonType.Tertiary}
							endEnhancer={<>&darr;</>}
						/>
					}
				>
					<ul className={styles['list']}>
						{Array.from({ length: totalPages }, (_, index) => (
							<li
								key={index + 1}
								onClick={() => handlePageChange(index + 1)}
								className={styles['list-item']}
								aria-hidden
							>
								Page {index + 1}
							</li>
						))}
					</ul>
				</Dropdown>
				<span>of {totalPages} pages</span>
				<Button
					type={ButtonType.Tertiary}
					label="Next"
					endEnhancer={<>&gt;</>}
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				/>
			</div>
		</div>
	)
}

export default Pagination
