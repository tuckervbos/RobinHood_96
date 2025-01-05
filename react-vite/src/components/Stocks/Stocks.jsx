import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllStocksThunk } from "../../redux/stock";
import { Link } from "react-router-dom";
import AIAssistant from "../AiAssistant/AiAssistant";
import StockTickerAnimation from "../StockTickerAnimation/StockTickerAnimation";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import "./Stocks.css";

function Stocks() {
	const dispatch = useDispatch();
	const stocks = useSelector((state) => state.stock.stocks);

	useEffect(() => {
		dispatch(showAllStocksThunk());
	}, [dispatch]);

	if (!stocks) return <p>Loading...</p>;

	return (
		<div className="stocks-page">
			<StockTickerAnimation />
			<SearchBar />
			<h1>Discover Stocks</h1>
			<ul>
				{stocks.map((stock) => (
					<li key={stock.id}>
						<h3>
							{stock.company_name} ({stock.ticker})
						</h3>
						<p>Price: ${stock.price}</p>
						<Link to={`/stocks/${stock.id}`}>View Details</Link>
					</li>
				))}
			</ul>
			<AIAssistant />
			<Footer />
		</div>
	);
}

export default Stocks;
