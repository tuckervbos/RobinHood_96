/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/
//flask db init, flask db migrate -m "text", flask db upgrade, flask seed  all
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { getOnePortfolio, sellStock, buyStock, deleteStock } from "../../redux/portfolios";

import "./OnePortfolio.css";

import CustomModal from "../AllPortfolios/CustomModal";

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
    // useEffect(() => {
    //     if (portfolio && portfolio.length > 0) {
    //       console.log("ONePORT TEST= ", portfolio[0], "USER: ", user, "PORTID: ", portfolio_id);
    //       console.log("Stocks: ", portfolio[0].stocks[0]);
    //     }
    //   }, [portfolio, user, portfolio_id]);

/***********************************************************************************************************************************************/
//*                            Sell button Modal
//!     stock prices in portfolio_stocks do not relect actual stock price
/***********************************************************************************************************************************************/
    
    //set modal state
    const [showsell, setshowsell] = useState(false);
    const [stockToSell, setStockToSell] = useState(null);
    const [sellErrors, setSellErrors] = useState({});

    //flask db init, flask db migrate -m "text", flask db upgrade, flask seed  all
    const handleSell = (e,stockId, portfolioId, quantity, price)=> {
        e.preventDefault();
        e.stopPropagation();

        setSellErrors({});
        let validationErrors = {};
        if (quantity <= 0){
            console.log("error test")
            validationErrors.error= "No more stock to sell";
        }
        if (Object.keys(validationErrors).length > 0) {
            setSellErrors(validationErrors);
            return;
        }

        dispatch(sellStock({stockId,portfolioId}))
        setshowsell(false);
    };

    //toggle for modal
    const sellEvent = (e,stock) => { //opens and closes modal
        e.preventDefault();
        e.stopPropagation();
        setSellErrors({});
        setStockToSell(stock); 
        setshowsell(!showsell);
    };

/***********************************************************************************************************************************************/
//*                            Buy button Modal
//!     stock prices in portfolio_stocks do not relect actual stock price
/***********************************************************************************************************************************************/
    
    //set modal state
    const [showBuy, setShowBuy] = useState(false);
    const [stockToBuy, setStockToBuy] = useState(null);
    const [buyErrors, setBuyErrors] = useState({});

    //flask db init, flask db migrate -m "text", flask db upgrade, flask seed  all
    const handleBuy = (e,stockId, portfolioId, quantity, price)=> {
        e.preventDefault();
        e.stopPropagation();

        setBuyErrors({});
        let validationErrors = {};
        if ((user.account_balance - price) < 0 ){ 
            validationErrors.error= "Insufficient funds";
        }
        if (Object.keys(validationErrors).length > 0) {
            setBuyErrors(validationErrors);
            return;
        }

        dispatch(buyStock({stockId,portfolioId}))
        setShowBuy(false);
    };

    //toggle for modal
    const buyEvent = (e,stock) => { 
        e.preventDefault();
        e.stopPropagation();
        setBuyErrors({})
        setStockToBuy(stock); 
        setShowBuy(!showBuy);
    };

/***********************************************************************************************************************************************/
//*                            Delete button Modal
//!     stock prices in portfolio_stocks do not relect actual stock price
/***********************************************************************************************************************************************/
    
    //set modal state
    const [showDelete, setshowDelete] = useState(false);
    const [stockToDelete, setStockToDelete] = useState(null);
    // const [deleteErrors, setdeleteErrors] = useState({});

    //flask db init, flask db migrate -m "text", flask db upgrade, flask seed all
    const handleDelete = (e,stockId, portfolioId, quantity, price)=> {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteStock({stockId,portfolioId}))
        setshowDelete(false);
    };

    //toggle for modal
    const deleteEvent = (e,stock) => { //opens and closes modal
        e.preventDefault();
        e.stopPropagation();
        // setDeleteErrors({});
        setStockToDelete(stock); 
        setshowDelete(!showDelete);
    };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return (
        <>
        {portfolio && portfolio.length > 0 ? (
            <>
                <h2 className="PortfolioTitle">{portfolio[0].portfolio_name}</h2>
                <ul className="AllStocksInPortfolioGrid">
                    {portfolio[0].stocks.map((stock) => (
                        <Link key={stock.id} to={`/stocks/${stock.id}`}>
                            <li className="StockLi">
                                <p className="StockName">{stock.name} ({stock.ticker})</p>
                                <p className="StockPrice">Price: {stock.price}</p>
                                <p className="StockQuantity">Quantity: {stock.quantity}</p>
                                <button type="button" onClick={(e) => sellEvent(e, stock)}>Sell</button>
                                <button type="button" onClick={(e) => buyEvent(e, stock)}>Buy</button>
                                <button type="button" onClick={(e) => deleteEvent(e, stock)}>Delete Stock</button>
                            </li>
                        </Link>
                    ))}
                </ul>

                {/* SELL MODAL */}
                <>{showsell && 
                    <CustomModal onClose={sellEvent}>
                        <div className='SellMessage'>Sell stock?</div>
                        <div className='SellButtons'>
                        {sellErrors.error && <p className="SellError">{sellErrors.error}</p>}
                        <button type="button" onClick={(e) => handleSell(e, stockToSell.id,portfolio[0].portfolio_id, stockToSell.quantity, stockToSell.price)}>Yes</button>
                        <button type="button" onClick={(e) => sellEvent(e)}>No</button>
                        </div>
                    </CustomModal>}
                </>

                {/* BUY MODAL */}
                <>{showBuy && 
                    <CustomModal onClose={buyEvent}>
                        <div className='buyMessage'>Buy stock?</div>
                        <div className='buyButtons'>
                        {buyErrors.error && <p className="buyError">{buyErrors.error}</p>}
                        <button type="button" onClick={(e) => handleBuy(e, stockToBuy.id,portfolio[0].portfolio_id, stockToBuy.quantity, stockToBuy.price)}>Yes</button>
                        <button type="button" onClick={(e) => buyEvent(e)}>No</button>
                        </div>
                    </CustomModal>}
                </>

                {/* DELETE MODAL */}
                <>{showDelete && 
                    <CustomModal onClose={deleteEvent}>
                        <div className='deleteMessage'>This will sell all shares of the stock and remove it from the portfolio, delete stock?</div>
                        <div className='deleteButtons'>
                        <button type="button" onClick={(e) => handleDelete(e, stockToDelete.id,portfolio[0].portfolio_id, stockToDelete.quantity, stockToDelete.price)}>Confirm</button>
                        <button type="button" onClick={(e) => deleteEvent(e)}>Cancel</button>
                        </div>
                    </CustomModal>}
                </>
            </>
        ) : (
            <div>Loading...</div> 
        )}
    </>
    )
}

export default OnePortfolio;