// show watch lists; create watchlist; delete watchlist;
// add to watchlist; remove from watchlist

const SHOW_WATCHLISTS = 'watchlists/SHOW_WATCHLISTS';
const CREATE_WATCHLIST = 'watchlist/CREATE_WATCHLIST';
const REMOVE_WATCHLIST = 'watchlist/REMOVE_WATCHLIST';
const ADD_TO_WATCHLIST = 'watchlist/ADD_TO_WATCHLIST';
const REMOVE_FORM_WATCHLIST = 'watchlist/REMOVE_FORM_WATCHLIST';

// all action creators

const showWatchlists = (watchlists) =>{
    return{
        type:SHOW_WATCHLISTS,
        payload:watchlists,
    }
}

const createWatchlist = (watchlistData) => {
    return {
        type: CREATE_WATCHLIST,
        payload: watchlistData, 
    };
};

const removeWatchlist = (watchlistId) => {
    return {
        type: REMOVE_WATCHLIST,
        payload: watchlistId, 
    };
};

const addToWatchlist = (stockId,watchlistId) => {
    return {
        type: ADD_TO_WATCHLIST,
        payload: {
          stockId,
          watchlistId,
        }
    };
};

const removeFromWatchlist = (stockId,watchlistId) => {
    return {
        type: REMOVE_FORM_WATCHLIST,
        payload: {
          stockId,
          watchlistId,
        }
    };
};

// thunk here 
// all the url need another check

export const showWatchlistsThunk = () => async (dispatch) => {
    const res = await fetch('/api/watchlists/');
    if (res.ok) {
      const watchlists = await res.json();
      dispatch(showWatchlists(watchlists));
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const createWatchlistThunk = (watchlistData) => async (dispatch) => {
    const res = await fetch('/api/watchlists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(watchlistData), 
    });
  
    if (res.ok) {
      const watchlist = await res.json();
      dispatch(createWatchlist(watchlist)); 
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const removeWatchlistThunk = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${watchlistId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (res.ok) {
      dispatch(removeWatchlist(watchlistId)); 
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const addToWatchlistThunk = (stockId,watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${stockId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: watchlistId }), 
    });
  
    if (res.ok) {
      dispatch(addToWatchlist(stockId, watchlistId)); 
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const removeFromWatchlistThunk = (stockId, watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${stockId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: watchlistId }),
      });

    if (res.ok) {
        dispatch(removeFromWatchlist(stockId, watchlistId));
      } else {
        const error = await res.json();
        throw error;
      }
};

// 以上已经检查过，reducer还没检查

const initialState = {watchlists: []}

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_WATCHLISTS:
      return { ...state, watchlists: action.payload };

    case CREATE_WATCHLIST: {
      const { id, watchlist_name, stock_id } = action.payload;
      const newWatchlist = {
        id,
        watchlist_name,
        stocks: stock_id ? [stock_id] : [], 
      };
      return { ...state, watchlists: [...state.watchlists, newWatchlist] };
    }

    case REMOVE_WATCHLIST: {
      const updatedWatchlists = state.watchlists.filter(
        (watchlist) => watchlist.id !== action.payload
      );
      return { ...state, watchlists: updatedWatchlists };
    }

    case ADD_TO_WATCHLIST: {
      const { stockId, watchlistId } = action.payload;
      const updatedWatchlists = state.watchlists.map((watchlist) =>
        watchlist.id === watchlistId
          ? { ...watchlist, stocks: [...watchlist.stocks, stockId] }
          : watchlist
      );
      return { ...state, watchlists: updatedWatchlists };
    }

    case REMOVE_FORM_WATCHLIST: {
      const { stockId, watchlistId } = action.payload;
      const updatedWatchlists = state.watchlists.map((watchlist) =>
        watchlist.id === watchlistId
          ? {
              ...watchlist,
              stocks: watchlist.stocks.filter((id) => id !== stockId),
            }
          : watchlist
      );
      return { ...state, watchlists: updatedWatchlists };
    }

    default:
      return state;
  }
};

export default watchlistReducer;
  
  
  
  
  
  




