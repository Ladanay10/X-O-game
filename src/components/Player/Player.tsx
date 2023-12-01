import React from 'react';
import './player.css';

interface PlayerProps {
	number: number;
	symbol: string;
	wins: number;
}

const Player: React.FC<PlayerProps> = ({ number, symbol, wins }) => {
	return (
		<div className={`${symbol === 'X' ? 'player_1' : 'player_2'}   `}>
			<h3 className="player_title">Гравець {number}  <span> Символ {symbol}</span>  </h3>
			перемог - {wins}
		</div>
	)
}

export default Player
