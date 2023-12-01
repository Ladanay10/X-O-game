import React, { ReactNode, MouseEvent } from 'react';
import './modal.css';


interface ModalProps {
	children: ReactNode;
	isModalOpen: boolean;
	onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isModalOpen, onClick }) => {
	const handleStop = (e: MouseEvent) => {
		e.stopPropagation();
	}
	return (
		<div onClick={onClick} className={isModalOpen ? 'modal' : ''}>
			<div className='content' onClick={handleStop}>
				{children}
				<button className='btn_modal' onClick={onClick}>OK</button>
			</div>
		</div>
	)
}

export default Modal
