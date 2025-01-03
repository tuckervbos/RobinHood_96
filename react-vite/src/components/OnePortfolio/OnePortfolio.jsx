/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/
//flask db init, flask db migrate -m "text", flask db upgrade, flask seed  all
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { getOnePortfolio } from "../../redux/portfolios";

import "./OnePortfolio.css";

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function OnePortfolio(){
    const dispatch = useDispatch();
    const {portfolio_id} = useParams();

    //Getting state from store
    const {portfolio, user} = useSelector((state) => {
        return {
            portfolio: state.portfolios.singlePortfolio,
            user: state.session.user
        }
    });
    

    //getting latest state on page load
    useEffect(()=> {
        dispatch(getOnePortfolio(portfolio_id))
    },[dispatch]); 

    //testing state
    useEffect(() => {
        if (portfolio && portfolio.length > 0) {
          console.log("ONePORT TEST= ", portfolio[0], "USER: ", user, "PORTID: ", portfolio_id);
          console.log("Stocks: ", portfolio[0].stocks);
        }
      }, [portfolio, user, portfolio_id]);

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return (
        <>
            <ul className="AllStocksInPortfolioGrid">
                {portfolio[0].stocks.map((stock) => (
                    <Link key={stock.id} to={`/stocks/${stock.id}`}>
                        <li key={stock.id} className="StockLi">
                            <p className="StockName">{stock.name} ({stock.ticker})</p>
                            <p className="StockPrice">Price: {stock.price}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    )
}

export default OnePortfolio