/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

import { getAllPortfolios } from "../../redux/portfolios";

import { deletePortfolio } from "../../redux/portfolios";

import "./AllPortfolios.css";

import CustomModal from "./CustomModal"

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
        dispatch(getAllPortfolios())
    },[dispatch]); 

/***********************************************************************************************************************************************/
//*                            Delete button Modal
/***********************************************************************************************************************************************/
   
    //set modal state
    const [showConfirm, setShowConfirm] = useState(false);
    const [portfolioToDelete, setPortfolioToDelete] = useState(null);

    //flask db init, flask db migrate -m "text", flask db upgrade, flask seed  all
    const handleDelete = (e, portfolioId)=> {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deletePortfolio(portfolioId))
        };

    //toggle for modal
    const deleteEvent = (e,portfolio) => { //opens and closes modal
        e.preventDefault();
        e.stopPropagation();
        setPortfolioToDelete(portfolio);
        setShowConfirm(!showConfirm);
    };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return(
        <>
            <ul className="AllPortfoliosGrid">
                {portfolios.map((portfolio) => (
                    <Link key={portfolio.portfolio_id} to={`/portfolios/${portfolio.portfolio_id}`}>
                        <li key={portfolio.portfolio_id} className="portfoliosLi">
                            <p className="portfoliosName">{portfolio.portfolio_name}</p>
                            <button type="button" onClick={(e) => deleteEvent(e, portfolio)}>Delete</button> 
                            <p className="portfoliosStocksNum">Number of stocks: {portfolios.length}</p>
                        </li>
                    </Link>
                ))}
            </ul>

            <>{showConfirm && 
                <CustomModal onClose={deleteEvent}>
                    <div className='deleteTitle'>Confirm Delete???</div>
                    <div className="deleteMessage">Are you sure you want to delete this Portfolio?</div>
                    <div className='deleteButtons'>
                    <button type="button" onClick={(e) => handleDelete(e, portfolioToDelete.portfolio_id)} style={{ backgroundColor: 'red', color: 'white' }}>Yes</button>
                        <button type="button" onClick={(e) => deleteEvent(e)} style={{ backgroundColor: 'grey', color: 'white' }}>No</button>
                    </div>
                </CustomModal>}
            </>

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