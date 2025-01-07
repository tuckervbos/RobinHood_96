/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const GET_ALL_PORTFOLIOS = "portfolios/getAllPortfolios";
const getAllPortfoliosAO = (portfolios) => {
    return {
        type: GET_ALL_PORTFOLIOS,
        payload: portfolios
    }
};


const GET_ONE_PORTFOLIO = "portfolios/getOnePortfolio";
const getOnePortfolioAO = (portfolio) => {
    return {
        type: GET_ONE_PORTFOLIO,
        payload: portfolio
    }
};

const CREATE_PORTFOLIO = "portfolios/createPortfolio";
const createPortfolioAO = (portfolio) => {
    return {
        type: CREATE_PORTFOLIO,
        payload: portfolio
    }
};

const REMOVE_PORTFOLIO = "portfolios/removePortfolio";
const removePortfolioAO = (portfolioId) => {
    return {
        type: REMOVE_PORTFOLIO,
        payload: portfolioId
    }
};

/***********************************************************************************************************************************************/
//*                            THUNKS
/***********************************************************************************************************************************************/

//Get all portfolios
export const getAllPortfolios = () => async (dispatch) => {
    const request = await fetch(`/api/portfolios/`);
    const response = await request.json();
    await dispatch(getAllPortfoliosAO(response));
    return response;
};


//get one portfolio
export const getOnePortfolio = (portfolioId) => async (dispatch) => {
    const request = await fetch(`/api/portfolios/${portfolioId}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const response = await request.json();
    dispatch(getOnePortfolioAO(response));
    return response;
};

//Delete portfolio
export const deletePortfolio = (portfolioId) => async (dispatch) => {
    const res = await fetch(`/api/portfolios/${portfolioId}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (res.ok) {
		dispatch(removePortfolioAO(portfolioId));
        dispatch(getAllPortfolios())
	} else {
		const error = await res.json();
		throw error;
	}

};

//Create portfolio
export const createPortfolio = (name) => async (dispatch) => {
    const request = await fetch(`/api/portfolios/`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })
    const response = await request.json();
    
    dispatch(createPortfolioAO(response));
    return response;
};

//edit portfolio
export const editPortfolio = (info) => async (dispatch) => {
    const {name, portfolioId} = info;
    
    const request = await fetch(`/api/portfolios/${portfolioId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name})
    })
    const response = await request.json();
    dispatch(getAllPortfolios())
    return response;
};

//Sell stock (from portfolio page)
export const sellStock = (info) => async (dispatch) => {
    const request = await fetch(`/api/portfolios/sell`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({info})
    })
    const response = await request.json();
    dispatch(getOnePortfolio(info.portfolioId));
    return response;
};

//Buy stock (from portfolio page)
export const buyStock = (info) => async (dispatch) => {
    const request = await fetch(`/api/portfolios/buy`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({info})
    })
    const response = await request.json();
    dispatch(getOnePortfolio(info.portfolioId));
    return response;
};

//Delete stock (from portfolio page)
export const deleteStock = (info) => async (dispatch) => {
    const request = await fetch(`/api/portfolios/deletestock`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({info})
    })
    const response = await request.json();
    dispatch(getOnePortfolio(info.portfolioId));
    return response;
}

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const initialState = {allPortfolios: [], singlePortfolio: []};

const portfoliosReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_PORTFOLIOS:
            return {...state, allPortfolios: action.payload}
        case GET_ONE_PORTFOLIO:
            return {...state, singlePortfolio: action.payload}
        case CREATE_PORTFOLIO:
            return {...state, allPortfolios: [...state.allPortfolios, action.payload]}
        case REMOVE_PORTFOLIO: {   
            const updatedPortfolios = state.allPortfolios.filter(
                (portfolio) => portfolio.id !== action.payload);
            return { ...state, allPortfolios: updatedPortfolios };
            }
        default: 
            return state;
    }
};

export default portfoliosReducer;