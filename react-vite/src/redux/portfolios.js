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

const CREATE_PORTFOLIO = "portfolios/createPortfolio";
const createPortfolioAO = (portfolio) => {
    return {
        type: CREATE_PORTFOLIO,
        payload: portfolio
    }
};

// const EDIT_PORTFOLIO = "portfolios/editPortfolio";
// const editPortfolioAO = (portfolio) => {
//     return {
//         type: EDIT_PORTFOLIO,
//         payload: portfolio
//     }
// };

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
    console.log("STOR ONE PRT= ",portfolioId)
    const request = await fetch(`/api/portfolios/${portfolioId}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const response = await request.json();
    console.log("STORE RES= ", response)
    dispatch(getOnePortfolioAO(response));
    return response;
};

//Delete portfolio
export const deletePortfolio = (portfolioId) => async (dispatch) => {
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
        default: 
            return state;
    }
};

export default portfoliosReducer;