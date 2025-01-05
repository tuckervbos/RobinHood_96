import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Watchlist from "../Watchlist/Watchlist";
import { showAllStocksThunk } from "../../redux/stock";
import "./HomePage.css";

const HomePage = () => {
	const dispatch = useDispatch();
	const stocks = useSelector((state) => state.stock.stocks);

	useEffect(() => {
		dispatch(showAllStocksThunk());
	}, [dispatch]);

	return (
		<div className="homepage">
			<div className="main-content">
				<div className="main-graphic">
					<img
						src="/home-page-image.svg"
						alt="Main Graphic"
						className="graphic-image"
					/>
					<h1>Welcome to Robinhood</h1>
					<p>Start managing your investments, watchlists, and portfolios.</p>
				</div>

				<div className="stock-links">
					<h2>Discover Investments</h2>
					<div className="stocks-grid">
						{stocks &&
							stocks.slice(0, 8).map((stock) => (
								<div key={stock.id} className="stock-card">
									<Link to={`/stocks/${stock.id}`}>
										<h3>{stock.name}</h3>
										<p>{`$${stock.price}`}</p>
									</Link>
								</div>
							))}
					</div>
				</div>

				<div className="portfolio-links">
					<h2>Your Portfolios</h2>
					<div className="portfolios-grid">
						<Link to="/portfolios/1">Portfolio</Link>
						<Link to="/portfolios/2">Portfolio</Link>
						<Link to="/portfolios/3">Portfolio</Link>
					</div>
				</div>
			</div>

			<aside className="watchlist-sidebar">
				<Watchlist />
			</aside>
		</div>
	);
};

export default HomePage;
