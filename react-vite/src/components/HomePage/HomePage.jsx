import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MiniWatchlist from "../MiniWatchlist/MiniWatchlist";
import { showAllStocksThunk } from "../../redux/stock";
import { getAllPortfolios } from "../../redux/portfolios";
import "./HomePage.css";
import SearchBar from "../SearchBar/SearchBar";
import AIAssistant from "../AiAssistant/AiAssistant";
import StockTickerAnimation from "../StockTickerAnimation/StockTickerAnimation";

const HomePage = () => {
	const dispatch = useDispatch();
	const stocks = useSelector((state) => state.stock.stocks);
	const portfolios = useSelector((state) => state.portfolios.allPortfolios);

	useEffect(() => {
		dispatch(showAllStocksThunk());
		dispatch(getAllPortfolios());
	}, [dispatch]);

	return (
		<div className="homepage-container">
			<div className="main-content">
				<StockTickerAnimation />
				<div className="welcome-text">
					<h1>Welcome to Robinhood</h1>
					<p>Start managing your investments, watchlists, and portfolios.</p>
				</div>
				<div className="main-graphic">
					<img
						src="/assets/home-page-image.jpg"
						alt="Main Graphic"
						className="graphic-image"
					/>
					<MiniWatchlist />
				</div>

				<div className="stock-links">
					<h2>Discover Investments</h2>
					<SearchBar />
					<div className="stocks-grid">
						{stocks &&
							stocks.slice(0, 20).map((stock) => (
								<Link
									to={`/stocks/${stock.id}`}
									key={stock.id}
									className="stock-button"
								>
									<div className="stock-content">
										<p>
											<strong>{stock.ticker}</strong>
										</p>
										<p>{`$${stock.price}`}</p>
									</div>
								</Link>
							))}
					</div>
				</div>

				<AIAssistant />

				<section>
					<h2>Your Portfolios</h2>
					{portfolios && portfolios.length > 0 ? (
						<ul>
							{portfolios.map((portfolio) => (
								<li key={portfolio.id} className="portfolio-item">
									<Link to={`/portfolios/${portfolio.portfolio_id}`}>
										<div className="portfolio-content">
											<h3>{portfolio.portfolio_name}</h3>
											{portfolio.stocks.length > 0 && (
												<p>{`Stocks: ${portfolio.stocks.length}`}</p>
											)}
										</div>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>No portfolios available. Create your first portfolio!</p>
					)}
				</section>
			</div>
		</div>
	);
};

export default HomePage;
