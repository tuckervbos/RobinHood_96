import { useSelector, useDispatch } from "react-redux";
import { addToWatchlistThunk } from "../../redux/watchlist";

const WatchlistSelectionModal = ({ stockId, closeModal }) => {
	const dispatch = useDispatch();
	const watchlists = useSelector((state) => state.watchlist.watchlists);

	const handleAddToWatchlist = (watchlistName) => {
		dispatch(addToWatchlistThunk(stockId, watchlistName));
		closeModal();
	};

	return (
		<div className="watchlist-selection-modal">
			<h2>Select Watchlist</h2>
			<ul>
				{watchlists.map((watchlist) => (
					<li key={watchlist.watchlist_name}>
						<button
							onClick={() => handleAddToWatchlist(watchlist.watchlist_name)}
						>
							{watchlist.watchlist_name}
						</button>
					</li>
				))}
			</ul>
			<button onClick={closeModal}>Cancel</button>
		</div>
	);
};

export default WatchlistSelectionModal;
