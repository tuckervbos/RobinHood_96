/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { Link } from 'react-router-dom';

import { getAllPortfolios } from "../../redux/portfolios";

import "./AllPortfolios.css";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AllPortfolios(){
    const dispatch = useDispatch();

    //Getting state from store
    const {portfolios, user} = useSelector((state) => {
        return {
            portfolios: state.portfolios.allPortfolios,
            user: state.session.user
        }
    });
    
    //getting latest state on page load
    useEffect(()=> {
        dispatch(getAllPortfolios(user.id))
    },[dispatch]); 

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return(
        <>
            <ul className="AllPortfoliosGrid">
                {portfolios.map((portfolio) => (
                    <Link to={`/portfolios/${portfolio.id}`}>
                        <li key={portfolio.id} className="portfoliosLi">
                            <p className="portfoliosName">{portfolio.portfolio_name}</p>
                            <p className="portfoliosStocksNum">Number of stocks: {portfolios.length}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="portfoliosTextBubble">
                <p className="portfoliosWord1">Your</p>
                <p className="portfoliosWord2">Stocks</p>
                <p className="portfoliosWord3">Your</p>
                <p className="portfoliosWord4">Way</p>
            </div>
        </>
    )
}

export default AllPortfolios;