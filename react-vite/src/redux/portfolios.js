/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { csrfFetch } from './csrf'; 

/***********************************************************************************************************************************************/
//*                             ACTION OBJECTS
/***********************************************************************************************************************************************/

const GET_ALL_PORTFOLIOS = "portfolios/getAllPortfolios"

const getAllPortfoliosAO = (portfolios) => {
    return {
        type: GET_ALL_PORTFOLIOS,
        payload: portfolios
    }
};

/***********************************************************************************************************************************************/
//*                            THUNKS
/***********************************************************************************************************************************************/

//Get all portfolios
export getAllPortfolios = (userId) => async (dispatch) => {
    const request = await csrfFetch((`/api/portfolios/${userId}`),{ //! Backend route changed to include userId in url!!!
        method: "GET"
    });
    const response = await request.json();
    dispatch(getAllPortfoliosAO(response));
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
        default: 
            return state;
    }
};

export default portfoliosReducer;