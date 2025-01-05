import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CloseStockModal({ stockId }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClose = () => {
		dispatch(closeStock(stockId));
		navigate(`/stocks`);
	};

	return (
		<div>
			<h2>Close Stock</h2>
			<p>Are you sure you want to close this stock?</p>
			<button onClick={handleClose}>Yes</button>
			<button onClick={() => navigate(`/stocks/${stockId}`)}>No</button>
		</div>
	);
}

export default CloseStockModal;
