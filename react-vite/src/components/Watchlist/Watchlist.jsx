import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showWatchlistsThunk, createWatchlistThunk, removeWatchlistThunk } from './store/watchlistActions'; // 根据路径调整导入

const WatchlistComponent = () => {
  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlist.watchlists); 
  const [newWatchlistName, setNewWatchlistName] = useState(''); 

  useEffect(() => {
    dispatch(showWatchlistsThunk());
  }, [dispatch]);

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      const watchlistData = { watchlist_name: newWatchlistName };
      dispatch(createWatchlistThunk(watchlistData));
      setNewWatchlistName(''); 
    } else {
      alert('Watchlist name cannot be empty');
    }
  };

  const handleDeleteWatchlist = (watchlistName) => {
    dispatch(removeWatchlistThunk(watchlistName));
  };

  return (
    <div>
      <h2>Your Watchlists</h2>
      <div>
        <input
          type="text"
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
          placeholder="Enter watchlist name"
        />
        <button onClick={handleCreateWatchlist}>Create Watchlist</button>
      </div>

      <ul>
        {Object.keys(watchlists).length === 0 ? (
          <li>No watchlists available</li>
        ) : (
          Object.keys(watchlists).map((watchlistName) => (
            <li key={watchlistName}>
              <div>
                <strong>{watchlistName}</strong>
                <button onClick={() => handleDeleteWatchlist(watchlistName)}>Delete</button>
              </div>
              <ul>
                {watchlists[watchlistName].map((stockId) => (
                  <li key={stockId}>{stockId}</li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WatchlistComponent;
