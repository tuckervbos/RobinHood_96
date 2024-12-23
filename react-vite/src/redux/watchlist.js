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

const removeWatchlist = (watchlistName) => {
    return {
        type: REMOVE_WATCHLIST,
        payload: watchlistName, 
    };
};

const addToWatchlist = (stockId, watchlistName) => {
    return {
        type: ADD_TO_WATCHLIST,
        payload: {
            stockId,
            watchlistName
        },
    };
};

const removeFromWatchlist = (stockId, watchlistName) => {
    return {
        type: REMOVE_FORM_WATCHLIST,
        payload: {
            stockId,
            watchlistName,
        },
    };
};

// thunk here

export const showWatchlistsThunk = () => async (dispatch) => {
    const res = await fetch('/api/watchlist/');
    if (res.ok) {
      const watchlists = await res.json();

      const grouped = watchlists.reduce((acc, item) => {
        if (!acc[item.watchlist_name]) acc[item.watchlist_name] = [];
        acc[item.watchlist_name].push(item.stock_id);
        return acc;
      }, {});

      dispatch(showWatchlists(grouped));
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const createWatchlistThunk = (watchlistData) => async (dispatch) => {
    const res = await fetch('/api/watchlist/', {
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

export const removeWatchlistThunk = (watchlistName) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ watchlist_name: watchlistName }), 
    });
  
    if (res.ok) {
      dispatch(removeWatchlist(watchlistName)); 
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const addToWatchlistThunk = (stockId, watchlistName) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${stockId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ watchlist_name: watchlistName }), 
    });
  
    if (res.ok) {
      dispatch(addToWatchlist(stockId, watchlistName)); 
    } else {
      const error = await res.json();
      throw error;
    }
  };

export const removeFromWatchlistThunk = (stockId, watchlistName) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${stockId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watchlist_name: watchlistName }),
      });

    if (res.ok) {
        dispatch(removeFromWatchlist(stockId, watchlistName));
      } else {
        const error = await res.json();
        throw error;
      }
};


const initialState = {watchlists: {}}

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_WATCHLISTS:
      return { ...state, watchlists: action.payload };

    case CREATE_WATCHLIST: {
      const { watchlist_name, stock_id } = action.payload;
      const updatedList = [...(state.watchlists[watchlist_name] || []), stock_id];
      return { ...state, watchlists: { ...state.watchlists, [watchlist_name]: updatedList } };
    }

    case REMOVE_WATCHLIST: {
      const { [action.payload]: _, ...remainingWatchlists } = state.watchlists;
      return { ...state, watchlists: remainingWatchlists };
    }

    case ADD_TO_WATCHLIST: {
      const { stockId, watchlistName } = action.payload;
      const updatedWatchlist = [...(state.watchlists[watchlistName] || []), stockId];
      return { ...state, watchlists: { ...state.watchlists, [watchlistName]: updatedWatchlist } };
    }

    case REMOVE_FORM_WATCHLIST: {
      const { stockId, watchlistName } = action.payload;
      const updatedWatchlist = (state.watchlists[watchlistName] || []).filter((id) => id !== stockId);
      return { ...state, watchlists: { ...state.watchlists, [watchlistName]: updatedWatchlist } };
    }

    default:
      return state;
  }
};

export default watchlistReducer;
  
  
  
  
  
  




