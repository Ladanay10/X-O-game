import React from 'react'
import './table.css'
interface TableProps {
	table: (string | null)[];
	boardSize: number;
	onClick: (index: number) => void;
}
const Table: React.FC<TableProps> = ({ table, onClick, boardSize }) => {

	return (
		<div className={`table size-${boardSize}`}>
			{table.map((value, index) => (
				<div key={index} onClick={() => value === null && onClick(index)} className='box'>
					{value}
				</div>
			))}
		</div>
	)
}

export default Table
