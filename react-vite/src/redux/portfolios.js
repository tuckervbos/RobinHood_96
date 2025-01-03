/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { csrfFetch } from './csrf'; 

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
    const request = await fetch(`/api/portfolios/${portfolioId}`);
    const response = await request.json();
    dispatch(getOnePortfolioAO(response));
    return response;
};

//Delete portfolio
export const deletePortfolio = (portfolioId) => async (dispatch) => {
    //calculating new account balance


    //deleting the portfolio
    const request = await fetch(`/api/portfolios/${portfolioId}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const response = await request.json();
    const newPortfolioList = await fetch(`/api/portfolios/`);
    const newPortfolioListResponse = await newPortfolioList.json();
    dispatch(getAllPortfolios(newPortfolioListResponse));
    return response; 
};

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
        default: 
            return state;
    }
};

export default portfoliosReducer;