import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { showOneStockThunk } from "../../redux/stock";
import WatchlistSelectionModal from "../WatchlistSelectionModal/WatchlistSelectionModal";
import AIAssistant from "../AiAssistant/AiAssistant";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import StockTickerAnimation from "../StockTickerAnimation/StockTickerAnimation";
import "./StockDetails.css";

function StockDetails() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { stock_id } = useParams();
	const [isModalOpen, setIsModalOpen] = useState(false);
	console.log("Stock ID from params:", stock_id);
	const stock = useSelector((state) => state.stock.currentStock);
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(showOneStockThunk(stock_id));
	}, [dispatch, stock_id]);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	if (!stock) return <p>Stock not found.</p>;

	return (
		<div className="stock-details">
			<StockTickerAnimation />
			<SearchBar />
			<h1>{stock.company_name}</h1>
			<h3>Price: ${stock.price}</h3>
			<div>
				<img src={stock.graph_image} alt={`${stock.company_name} graph`} />
			</div>

			{/* debug this */}
			<p>{stock.description}</p>
			{sessionUser && (
				<div>
					<button onClick={openModal}>Add to Watchlist</button>
				</div>
			)}
			<button onClick={() => navigate("/stocks")}>Back to Stocks</button>

			{isModalOpen && (
				<WatchlistSelectionModal stockId={stock.id} closeModal={closeModal} />
			)}
			<AIAssistant />
			<Footer />
		</div>
	);
}

export default StockDetails;
