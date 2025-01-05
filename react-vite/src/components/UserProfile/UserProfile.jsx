import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  thunkDeleteUser,
  editUser,
  getUserById,
  userNameCheck,
  emailCheck,
  depositFunds,
} from "../../redux/session";

import { getAllPortfolios } from "../../redux/portfolios";

import { showWatchlistsThunk } from "../../redux/watchlist";

import StockTickerAnimation from "../StockTickerAnimation/StockTickerAnimation";

import CustomModal from "../AllPortfolios/CustomModal";

import "./UserProfile.css";
import SearchBar from "../SearchBar/SearchBar";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);

  const user = useSelector((state) => state.session.user);
  const portfolios = useSelector((state) => state.portfolios.allPortfolios);
  const watchlists = useSelector((state) => state.watchlist.watchlists);

  useEffect(() => {
    dispatch(showWatchlistsThunk());
    dispatch(getAllPortfolios());
    // dispatch(getUserById(user.id))
  }, [dispatch]);

  const deleteUser = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteUser(user.id));
    navigate("/");
  };

  const showModal = (e) => {
    e.preventDefault();
    setShowDelete(!showDelete);
  };

  /***********************************************************************************************************************************************/
  //*                            Edit button Modal
  /***********************************************************************************************************************************************/

  const [showEdit, setShowEdit] = useState(false);
  const [errors, setEditErrors] = useState({});
  // const [userToEdit, setUserToEdit] = useState(); //!!!!
  // const [editName,setEditName] = useState(); //!!!!
  const [username, setUsername] = useState(user.username);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleEdit = async (e, username, firstname, lastname, email) => {
    e.preventDefault();
    e.stopPropagation();

    setEditErrors({});
    let validationErrors = {};
    if (username.length < 1) {
      validationErrors.username = "UserName must be at least 1 character";
    }
    if (firstname.length < 1) {
      validationErrors.firstname = "first name must be at least 1 character";
    }
    if (lastname.length < 1) {
      validationErrors.lastname = "last name must be at least 1 character";
    }
    const userNameTaken = await dispatch(userNameCheck(username));

    if (
      userNameTaken.exists &&
      userNameTaken.exists.username != user.username
    ) {
      validationErrors.username = `${username} is already taken!`;
    }
    const emailTaken = await dispatch(emailCheck(email));

    if (emailTaken.exists && emailTaken.exists.email != user.email) {
      validationErrors.email = `${email} is already taken!`;
    }
    if (Object.keys(validationErrors).length > 0) {
      //!ERROR HANDLING MUST BE ADDED IN HTML
      setEditErrors(validationErrors);
      return;
    }

    dispatch(
      editUser({ username, firstname, lastname, email, userId: user.id })
    ); //!!!!
    dispatch(getUserById(user.id));
    setShowEdit(false);
  };

  //toggle for modal
  const editEvent = (e) => {
    //!DOES THE EDIT EVENT NEED THE USER OBJ??? (I THINK NO)
    e.preventDefault();
    e.stopPropagation();
    setUsername(user.username);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setShowEdit(!showEdit);
  };

  /***********************************************************************************************************************************************/
  //*                            Deposite funds button
  /***********************************************************************************************************************************************/

  const [money, setMoney] = useState();

  const handleDeposit = (e, money) => {
    e.preventDefault();
    e.stopPropagation();
    if (money) {
      dispatch(depositFunds({ money, userId: user.id }));
      dispatch(getUserById(user.id));
      setMoney("");
    }
  };

  /***********************************************************************************************************************************************/
  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div className="userProfile">
        <div className="top">
          <h1>{user.username} Profile</h1>
        </div>
        <div className="profileSec1">
          <div className="userImage">
            <div className="glowBack">
              <img
                title={`${user.username} profile picture`}
                src="https://i.pinimg.com/736x/a8/4a/a3/a84aa310f33862e53c30f55bdf94b013.jpg"
                alt="{`${user.username} profile picture`}"
              />
            </div>
          </div>
          <div className="userInfo">
            <h2>
              {user?.firstname}, {user?.lastname}
            </h2>
            <p>${user?.account_balance}</p>
            <button
              type="button"
              className="profileEditBtn"
              onClick={(e) => editEvent(e)}
            >
              Edit User
            </button>
            <button className="profileDeleteBtn" onClick={showModal}>
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      {/* ADD FUNDS BUTTON */}
      <div className="addFundsSec">
        <h2 className="addToFunds">Add Funds</h2>
          <p className="addToFunds">Account balance: {user.account_balance}</p>
          <label className="addToFunds">                 
              <input
                  type="integer"
                  placeholder="$"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
              />   
          </label> 
          {/* <div class="addFundsButtons"> */}
          <button className="addFundsDepositBtn" type="button" onClick={(e) => handleDeposit(e, money)}>Deposit</button>
          <button className="addFundsWithdrawBtn" type="button" >Withdraw</button>
          {/* </div> */}
          </div>
          <br />
      <div>
        <StockTickerAnimation />
      </div>
      <br />
      <div>
        <div className="profileSec2">
          <div className="portfolioWatchlist">
            {portfolios && portfolios?.length > 0 ? (
              portfolios.map((portfolio) => (
                <div
                  className="portfolioWatchlistStock"
                  key={portfolio?.portfolio_id}
                >
                  <Link
                    className="portfolioWatchlistLink"
                    to={`/portfolios/${portfolio?.portfolio_id}`}
                  >
                    {portfolio.portfolio_name}
                  </Link>
                  {portfolio?.stocks?.length > 0 ? (
                    <ul>
                      {portfolio?.stocks.map((stock) => (
                        <li key={stock.id}>
                          <p>
                            {stock.name} ({stock.ticker})
                          </p>
                          <p>${stock.price}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No stocks in this portfolio.</p>
                  )}
                </div>
              ))
            ) : (
              <p>
                No portfolio available. Create your first portfolio{" "}
                <Link to={"/portfolios"}>here</Link>!
              </p>
            )}
          </div>
          <div className="portfolioWatchlist">
            {watchlists && watchlists.length > 0 ? (
              watchlists.map((watchlist) => (
                <div
                  className="portfolioWatchlistStock"
                  key={watchlist.watchlist_id}
                >
                  <Link className="portfolioWatchlistLink" to={`/watchlists`}>
                    {watchlist.watchlist_name}
                  </Link>
                  {watchlist.stocks.length > 0 ? (
                    <ul>
                      {watchlist.stocks.map((stock) => (
                        <li key={stock.id}>
                          <p>
                            {stock.name} ({stock.ticker})
                          </p>
                          <p>${stock.price}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No stocks in this watchlist.</p>
                  )}
                </div>
              ))
            ) : (
              <p>
                No watchlists available. Create your first watchlist{" "}
                <Link to={`/watchlists`}>here</Link>!
              </p>
            )}
          </div>
        </div>
      </div>
      <>
        {showDelete && (
          <CustomModal onClose={showModal}>
            <div className="deleteMessage">
              By clicking confirm, you will permanently delete your account?
            </div>
            <div className="deleteButtons">
              <button type="button" onClick={deleteUser}>
                Confirm
              </button>
              <button type="button" onClick={showModal}>
                Cancel
              </button>
            </div>
          </CustomModal>
        )}
      </>

      {/* Edit PORTFOLIO MODAL */}
      <>
        {showEdit && (
          <CustomModal onClose={(e) => editEvent(e)}>
            <div className="editUserTitle">Edit User info</div>
            <div className="editButtons">
              <label className="editUsername">
                UserName:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <span className="profileErrors">{errors.username}</span>
                )}
              </label>
              <label className="editFirstname">
                First name:
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                {errors.firstname && (
                  <span className="profileErrors">{errors.firstname}</span>
                )}
              </label>
              <label className="editLastname">
                Last name:
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                {errors.lastname && (
                  <span className="profileErrors">{errors.lastname}</span>
                )}
              </label>
              <label className="editEmail">
                Email:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span className="profileErrors">{errors.email}</span>
                )}
              </label>
              <button
                type="button"
                onClick={(e) =>
                  handleEdit(e, username, firstname, lastname, email)
                }
              >
                Confirm Change
              </button>
              <button type="button" onClick={editEvent}>
                cancel
              </button>
            </div>
          </CustomModal>
        )}
      </>
    </>
  );
};

export default UserProfile;
