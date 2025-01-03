/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

import { getAllPortfolios } from "../../redux/portfolios";

import { deletePortfolio, createPortfolio, editPortfolio } from "../../redux/portfolios";

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
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [portfolioToDelete, setPortfolioToDelete] = useState(null);

    //flask db init, flask db migrate -m "text", flask db upgrade, flask seed  all
    const handleDelete = (e, portfolioId)=> {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deletePortfolio(portfolioId))
        setShowConfirmDelete(false);
        };

    //toggle for modal
    const deleteEvent = (e,portfolio) => { //opens and closes modal
        e.preventDefault();
        e.stopPropagation();
        setPortfolioToDelete(portfolio);
        setShowConfirmDelete(!showConfirmDelete);
    };

/***********************************************************************************************************************************************/
//*                            Create button Modal
/***********************************************************************************************************************************************/
   
    //set modal state
    const [showConfirmCreate, setShowConfirmCreate] = useState(false);
    const [name, setName] = useState();
    const [errors, setErrors] = useState({});

    const handleCreate = (e, portfolioId)=> {
        e.preventDefault();
        e.stopPropagation();

        setErrors({});
        let validationErrors = {};
        if (name.length < 1){
            validationErrors.name = "Name must be at least 1 character";
        }
        portfolios.forEach((portfolio) => {
            if(name === portfolio.portfolio_name){
                console.log("UNIQUE NAME ERROR ",name === portfolio.portfolio_name)
                validationErrors.name = "Name must be unique";
            }
        })
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(createPortfolio(name));
        setShowConfirmCreate(false);
    };
    
    //toggle for modal
    const createEvent = (e,portfolio) => { //opens and closes modal
        e.preventDefault();
        e.stopPropagation();
        setName("");
        setShowConfirmCreate(!showConfirmCreate)
    };

/***********************************************************************************************************************************************/
//*                            Edit button Modal
/***********************************************************************************************************************************************/
   
    const [showEdit, setShowEdit] = useState(false);
    const [editErrors, setEditErrors] = useState({});
    const [portfolioToEdit, setPortfolioToEdit] = useState();
    const [editName,setEditName] = useState()

    const handleEdit = (e, portfolioId) => {
        e.preventDefault();
        e.stopPropagation();

        setEditErrors({});
        let validationErrors = {};
        if (editName.length < 1){
            validationErrors.name = "Name must be at least 1 character";
        }
        portfolios.forEach((portfolio) => {
            if(editName === portfolio.portfolio_name){
                console.log("UNIQUE NAME ERROR ",editName === portfolio.portfolio_name)
                validationErrors.editName = "Name must be unique";
            }
        })
        if (Object.keys(validationErrors).length > 0) {
            setEditErrors(validationErrors);
            return;
        }

        dispatch(editPortfolio({name:editName,portfolioId}));
        setShowEdit(false);
    };

    //toggle for modal
    const editEvent = (e, portfolio) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (portfolio) {
            // Opening the modal
            setPortfolioToEdit(portfolio);
            setEditName(portfolio.portfolio_name);
        } else {
            // Closing the modal
            setPortfolioToEdit(null);
            setEditName('');
        }
        
        setShowEdit(!showEdit);
    };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/
    
    return(
        <>  
            
            <ul className="AllPortfoliosGrid">
            <button type="button" onClick={createEvent}>Create New Portfolio</button> 
                {portfolios.map((portfolio) => (
                    <Link key={portfolio.portfolio_id} to={`/portfolios/${portfolio.portfolio_id}`}>
                        <li key={portfolio.portfolio_id} className="portfoliosLi">
                            <p className="portfoliosName">{portfolio.portfolio_name}</p>
                            <button type="button" onClick={(e) => deleteEvent(e, portfolio)}>Delete</button> 
                            <button type="button" onClick={(e) => editEvent(e, portfolio)}>Edit Name</button> 
                            {/* <p className="portfoliosStocksNum">Number of stocks: {portfolios.length}</p> */}
                        </li>
                    </Link>
                ))}
            </ul>

            {/* DELETE MODAL */}
            <>{showConfirmDelete && 
                <CustomModal onClose={deleteEvent}>
                    <div className='deleteTitle'>Confirm Delete???</div>
                    <div className="deleteMessage">Are you sure you want to delete this Portfolio?</div>
                    <div className='deleteButtons'>
                    <button type="button" onClick={(e) => handleDelete(e, portfolioToDelete.portfolio_id)} style={{ backgroundColor: 'red', color: 'white' }}>Yes</button>
                        <button type="button" onClick={(e) => deleteEvent(e)} style={{ backgroundColor: 'grey', color: 'white' }}>No</button>
                    </div>
                </CustomModal>}
            </>

            {/* CREATE PORTFOLIO MODAL */}
            <>{showConfirmCreate && 
                <CustomModal onClose={createEvent}>
                    <div className='CreateTitle'>Give a name to your new portfolio</div>
                    <div className='createButtons'>
                    <label className="creatSpotLabel">                 
                        <input
                            type="text"
                            placeholder="Enter a unique name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <span className="PortfolioError">{errors.name}</span>}
                    </label>   
                    <button type="button" onClick={(e) => handleCreate(e)} style={{ backgroundColor: 'red', color: 'white' }}>Create</button>
                    <button type="button" onClick={createEvent} style={{ backgroundColor: 'grey', color: 'white' }}>cancel</button>
                    </div>
                </CustomModal>}
            </>

            {/* Edit PORTFOLIO MODAL */}
            <>{showEdit && 
                <CustomModal onClose={(e) => editEvent(e)}>
                    <div className='editTitle'>Edit portfolio name</div>
                    <div className='editButtons'>
                    <label className="editSpotLabel">                 
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        {editErrors.name && <span className="PortfolioError">{editErrors.name}</span>}
                    </label>   
                    <button type="button" onClick={(e) => handleEdit(e,portfolioToEdit.portfolio_id)} style={{ backgroundColor: 'red', color: 'white' }}>Confirm Change</button>
                    <button type="button" onClick={editEvent} style={{ backgroundColor: 'grey', color: 'white' }}>cancel</button>
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