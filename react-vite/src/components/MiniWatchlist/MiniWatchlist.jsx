import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./MiniWatchlist.css";

const MiniWatchlist = () => {
	const watchlists = useSelector((state) => state.watchlist.watchlists);

	if (!watchlists || watchlists.length === 0) {
		return <p>No watchlists available. Create your first watchlist!</p>;
	}
	return (
		<div className="mini-watchlist">
			<h3>Your Watchlists</h3>
			{watchlists.map((watchlist) => (
				<div key={watchlist.id} className="watchlist-section">
					{/* Link to the full watchlist */}
					<Link to={`/watchlists`} className="watchlist-title">
						<h4>{watchlist.watchlist_name}</h4>
					</Link>
					{watchlist.stocks.length > 0 ? (
						<ul className="watchlist-items">
							{watchlist.stocks.slice(0, 5).map((stock) => (
								<li key={stock.id} className="watchlist-item">
									<Link to={`/stocks/${stock.id}`} className="stock-link">
										<div className="stock-info">
											<span className="stock-ticker">{stock.ticker}</span>
											<span className="stock-price">
												{stock.price}
												{/* {typeof stock.price === "number"
													? `$${stock.price.toFixed(2)}`
													: "N/A"} */}
											</span>
										</div>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>No stocks in this watchlist.</p>
					)}
					{watchlist.stocks.length > 5 && (
						<Link
							to={`/watchlists/${watchlist.watchlist_id}`}
							className="view-more"
						>
							View More
						</Link>
					)}
				</div>
			))}
		</div>
	);
};

export default MiniWatchlist;
