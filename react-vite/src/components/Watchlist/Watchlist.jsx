import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showWatchlistsThunk, createWatchlistThunk, removeWatchlistThunk,removeFromWatchlistThunk } from '../../redux/watchlist'; 
import './Watchlist.css'

const WatchlistComponent = () => {
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist.watchlists); 
  // console.log(watchlists)

  const [newWatchlistName, setNewWatchlistName] = useState(''); 

  //load all the watchlists
  useEffect(() => {
    dispatch(showWatchlistsThunk());
  }, [dispatch]);

  //create new watchlist
  const handleCreateWatchlist = (e) => {
    e.preventDefault()

    if (newWatchlistName.trim()) {
      const watchlistData = { watchlist_name: newWatchlistName };
      dispatch(createWatchlistThunk(watchlistData));
      setNewWatchlistName(''); 
    } else {
      alert('Watchlist name cannot be empty');
    }
  };

  // delete watchlist
  const handleDeleteWatchlist = (watchlistId) => {
    dispatch(removeWatchlistThunk(watchlistId));
  };

  // delete stock from watchlist
  const handleRemoveStock = (stockId, watchlistId) => {
    dispatch(removeFromWatchlistThunk(stockId,watchlistId));
  };


  return (
    <div  className='watchlist-container'>
      <h2>Watchlists</h2>

      {/* create watchlist */}
      <form onSubmit={handleCreateWatchlist}>
        <input
          type="text"
          placeholder="Enter watchlist name"
          value={newWatchlistName}
          onChange={(e) => setNewWatchlistName(e.target.value)}
        />
        <button type="submit">Create Watchlist</button>
      </form>

      {/* show all watchlist */}
      < div className='all-watchlists'>
        {watchlists && watchlists.length > 0 ? (
          watchlists.map((watchlist) => (
            <div key={watchlist.watchlist_id} >
              <h3>{watchlist.watchlist_name}</h3>
              {watchlist.stocks.length > 0 ? (
                <ul>
                  {watchlist.stocks.map((stock) => (
                    <li key={stock.id} >
                      <span>
                        {stock.name} ({stock.ticker}) - ${stock.price}
                      </span>
                      {/* we can change this button to a "x" */}
                      <button onClick={() => handleRemoveStock(stock.id, watchlist.watchlist_id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No stocks in this watchlist.</p>
              )}
              <button onClick={() => handleDeleteWatchlist(watchlist.watchlist_id)}>Delete Watchlist</button>
            </div>
          ))
        ) : (
          <p>No watchlists available. Create your first watchlist!</p>
        )}
      </div>
    </div>
  );
};


export default WatchlistComponent;
