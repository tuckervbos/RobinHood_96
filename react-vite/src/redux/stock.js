// show all stocks; show one stock

// action types
const SHOW_ALL_STOCKS = 'stocks/SHOW_ALL_STOCKS';
const SHOW_ONE_STOCK = 'stock/SHOW_ONE_STOCK';

// action creators
const showAllStocks = (stocks)=>{
    return{
        type: SHOW_ALL_STOCKS,
        payload: stocks,
    }
}

const showOneStock = (stock)=>{
    return{
        type: SHOW_ONE_STOCK,
        payload: stock,
    }
}

// thunk here
export const showAllStocksThunk = () =>async(dispatch)=>{
    const res = await fetch('/api/stocks');
    if(res.ok){
        const data = await res.json()
        dispatch(showAllStocks(data))
    }else{
        const error = await res.json();
        throw error;
    }
}

export const showAllStocksSearchThunk = (input)=>async(dispatch)=>{
    const res = await fetch(`/api/stocks/search?input=${input}`);
    if(res.ok){
        const data = await res.json()
        dispatch(showAllStocks(data.results_list))
    }else{
        const error = await res.json();
        throw error;    
    }
}

export const showOneStockThunk = (stockId) =>async(dispatch)=>{
    const res = await fetch(`/api/stocks/${stockId}`);
    if(res.ok){
        const data = await res.json();
        dispatch(showOneStock(data));
    }else{
        const error = await res.json();
        throw error;
    }

}

//reducer
const initialState = {
    currentStock: null,
    stocks: []
}

const stockReducer = (state = initialState,action)=>{
    switch(action.type){
        case SHOW_ALL_STOCKS:
            return{...state,stocks:action.payload}
        case SHOW_ONE_STOCK:
            return{...state,currentStock:action.payload}
        default:
            return state;
    }
}

export default stockReducer;