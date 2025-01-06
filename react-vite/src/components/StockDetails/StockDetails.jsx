import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { showOneStockThunk } from "../../redux/stock";
import { getAllPortfolios, buyStock } from "../../redux/portfolios";
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
	const stock = useSelector((state) => state.stock.currentStock);
	const sessionUser = useSelector((state) => state.session.user);
	const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
	const userPortfolios = useSelector((state) => state.portfolios.allPortfolios);
	
	useEffect(() => {
		dispatch(showOneStockThunk(stock_id));
		dispatch(getAllPortfolios());
	}, [dispatch, stock_id]);
	console.log('ACC=  =', sessionUser.account_balance)
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleBuyStock = () => {
		if (selectedPortfolioId && (sessionUser.account_balance - stock.price >= 0)) {
			dispatch(
				buyStock({ portfolioId: selectedPortfolioId, stockId: stock_id })
			)
				.then(() => alert("Stock added successfully!"))
				.catch((err) => alert(err.message || "Something went wrong."));
		} else {
			alert("Invalid funds/Select a portfolio");
		}
	};

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

			<p>{stock.company_description}</p>
			{sessionUser && (
				<div>
					<button onClick={openModal}>Add to Watchlist</button>
				</div>
			)}
			<select onChange={(e) => setSelectedPortfolioId(e.target.value)}>
				<option value="">Select Portfolio</option>
				{userPortfolios.length > 0 ? (
					userPortfolios.map((portfolio) => (
						<option key={portfolio.portfolio_id} value={portfolio.portfolio_id}>
							{portfolio.portfolio_name}
						</option>
					))
				) : (
					<option disabled>No portfolios available</option>
				)}
			</select>
			<button onClick={handleBuyStock}>Add to Portfolio</button>
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
