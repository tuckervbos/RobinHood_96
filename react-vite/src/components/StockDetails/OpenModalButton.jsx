import { useState } from "react";

function OpenModalButton({ buttonText, modalComponent, onModalClose }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		if (onModalClose) {
			onModalClose();
		}
	};

	return (
		<>
			<button onClick={openModal}>{buttonText}</button>
			{isModalOpen && (
				<div className="modal">
					{React.cloneElement(modalComponent, { closeModal })}
					<button onClick={closeModal} className="modal-close">
						Close
					</button>
				</div>
			)}
		</>
	);
}

export default OpenModalButton;
