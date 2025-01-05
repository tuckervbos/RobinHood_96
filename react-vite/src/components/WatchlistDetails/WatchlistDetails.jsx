import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showWatchlistsThunk } from "../../redux/watchlist";

const WatchlistDetails = () => {
	const { watchlist_id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(showWatchlistsThunk());
	}, [dispatch]);

	const watchlist = useSelector((state) =>
		state.watchlist.watchlists.find(
			(wl) => wl.watchlist_id === Number(watchlist_id)
		)
	);

	if (!watchlist) return <p>Loading watchlist...</p>;

	return (
		<div>
			<h1>{watchlist.watchlist_name}</h1>
			<ul>
				{watchlist.stocks.map((stock) => (
					<li key={stock.id}>
						{stock.ticker} - ${stock.price}
					</li>
				))}
			</ul>
		</div>
	);
};

export default WatchlistDetails;
