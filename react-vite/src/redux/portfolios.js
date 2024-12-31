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
    const request = await csrfFetch((`/api/portfolios`),{
        headers: {
            'Content-Type': 'application/json',
          },
    });
    const response = await request.json();

    console.log("ALL PORT= ",response)
    
    await dispatch(getAllPortfoliosAO(response));
    // return response;
};


//get one portfolio
export const getOnePortfolio = (portfolioId) => async (dispatch) => {
    const request = await fetch((`/api/portfolios/${portfolioId}`),{
        method: "GET"
    });
    const response = await request.json();
    dispatch(getOnePortfolioAO(response));
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
        default: 
            return state;
    }
};

export default portfoliosReducer;