import React, { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import Player from "./components/Player/Player";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";


const App = () => {
	const [score, setScore] = useState({ x: 0, o: 0 })
	const [boardSize, setBoardSize] = useState(3); // Додали стейт для зберігання розміру гри
	const [table, setTable] = useState(Array(9).fill(null));
	const [isXPlaing, setIsXPlaing] = useState(true);
	const [gameOver, setGameOver] = useState(false);
	const [whoIsWinner, setWhoIsWinner] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Примітка (CHAT GPT ДОПОМІГ)
	const calculateWhoIsWin = (table: any, boardSize: number) => {
		const lines: number[][] = [];

		// Горизонтальні лінії
		for (let i = 0; i < boardSize; i++) {
			lines.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
		}

		// Вертикальні лінії
		for (let i = 0; i < boardSize; i++) {
			lines.push(Array.from({ length: boardSize }, (_, j) => i + j * boardSize));
		}

		// Діагоналі
		lines.push(Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)));
		lines.push(Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)));

		for (const line of lines) {
			const [a, b, c] = line;
			if (table[a] && table[a] === table[b] && table[a] === table[c]) {
				setGameOver(true);
				setIsModalOpen(true);
				setIsXPlaing(true);
				return table[a];
			}
		}
		const draw = table.every((tile: string) => tile !== null);
		if (draw) {
			setGameOver(true);
			setIsModalOpen(true);
			setIsXPlaing(true);
			setWhoIsWinner('Draw');
			return 'Draw';
		}

		return null;
	};
	useEffect(() => {
		calculateWhoIsWin(table, boardSize);
	}, [table])

	const handleClick = (id: number) => {
		const uptade = table.map((value, index) => {
			if (index === id) {
				return isXPlaing ? 'X' : 'O'
			} else {
				return value
			}
		});
		const winner = calculateWhoIsWin(uptade, boardSize);
		if (winner) {
			if (winner === 'O') {
				let { o } = score;
				o += 1;
				setScore({ ...score, o });
			} else if (winner === 'X') {
				let { x } = score;
				x += 1;
				setScore({ ...score, x });
			};
		};
		setWhoIsWinner(winner);
		setTable(uptade);
		setIsXPlaing(!isXPlaing)

	}
	const resetBoard = () => {
		setTable(Array(boardSize * boardSize).fill(null));
		setGameOver(false);
		setIsXPlaing(true);
		setWhoIsWinner('');
		setIsModalOpen(false);
	}
	const modalOpen = () => {
		setIsModalOpen(!isModalOpen)
	}
	const handleChangeBoardSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const size = parseInt(e.target.value);
		setBoardSize(size);
	}

	return (
		<div className="app">
			<div className="game">
				<h2>Загальна кількість ігор: {score.o + score.x}</h2>
				<div className="players_info">

					<Player
						number={1}
						symbol={'X'}
						wins={score.x}
					/>
					{isXPlaing && <div className="active_player_1">
						Ваш хід
						<FaArrowRight />
					</div>}
					<Player
						number={2}
						symbol={'O'}
						wins={score.o}
					/>
					{isXPlaing || <div className="active_player_2">
						Ваш хід
						<FaArrowLeft />
					</div>}

				</div>

				<Table
					table={table}
					onClick={gameOver ? resetBoard : handleClick}
					boardSize={boardSize}
				/>
				<button
					onClick={resetBoard}
					className="btn_new-game"
				>
					Нова гра
				</button>
				<div className="table-size">
					<label>Вибрати розмір сітки</label>
					<select value={boardSize} onChange={handleChangeBoardSize}>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="9">9</option>
					</select>
				</div>
			</div>
			{
				isModalOpen &&
				<Modal onClick={modalOpen} isModalOpen={isModalOpen}>
					<div className="modal_info">
						{
							whoIsWinner === 'Draw' ?
								<div>
									Нічия
								</div> :
								< p className="modal_info_player">
									Виграв гравець - {whoIsWinner}
									<span>
										Вітаємо !
									</span>
								</p>
						}
					</div>
				</Modal>
			}
		</div >
	)
}
export default App;


