/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { getAllPortfolios } from "../../redux/portfolios";

import "./AllPortfolios.css";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function AllPortfolios(){
    const dispatch = useDispatch;

    //Getting state from store
    const {portfolios, user} = useSelector((state) => {
        return {
            portfolios: state.portfolios.allPortfolios,
            user: state.session.user
        }
    });
    
    //getting latest state on page load
    useEffect(()=> {
        dispatch(getAllPortfolios())
    })

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    //! need to test mapping!!!!
    return(
        <ul className="AllPortfoliosGrid">
            {portfolios.map((portfolio) => (
                <link to={`/portfolios/${portfolio.id}`}>
                    <li key={portfolio.id} className="portfoliosLi">
                        <p>{portfolio.portfolio_name}</p>
                        <p>Number of stocks: {portfolios.length}</p>
                    </li>
                </link>
            ))}
            
        </ul>
    )
}

export default AllPortfolios;