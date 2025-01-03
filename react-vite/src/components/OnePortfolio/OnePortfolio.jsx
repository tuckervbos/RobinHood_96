/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { getOnePortfolio } from "../../redux/portfolios";

import "./OnePortfolio.css";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function OnePortfolio(){
    const dispatch = useDispatch;
    const {portfolioId} = useParams();

    //Getting state from store
    const {portfolio, user} = useSelector((state) => {
        return {
            portfolio: state.portfolios.singlePortfolio,
            user: state.session.user
        }
    });

    //getting latest state on page load
        // useEffect(()=> {
        //     dispatch(getOnePortfolio())
        // },[dispatch]); 

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return (
        <>
            <h1>one portfolio</h1>
        </>
    )
}

export default OnePortfolio