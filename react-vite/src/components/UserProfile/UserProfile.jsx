import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { thunkDeleteUser, thunkLogout } from "../../redux/session";
import { getAllPortfolios } from "../../redux/portfolios";
import { showWatchlistsThunk } from "../../redux/watchlist";
import StockTickerAnimation from "../StockTickerAnimation/StockTickerAnimation";
import CustomModal from "../AllPortfolios/CustomModal";
import "./UserProfile.css";

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
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteUser(user.id));
    navigate("/");
  };

  const showModal = (e) => {
    e.preventDefault();
    setShowDelete(!showDelete);
  };

  return (
    <>
      <div className="userProfile">
        <div className="top">
          <h1>{user?.username} Profile</h1>
          <button onClick={logout}>Log Out</button>
        </div>
        <div className="profileSec1">
          <div className="userImage">
            <div className="glowBack">
              <img
                title={`${user?.username} profile picture`}
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
            <button className="profileEditBtn">Edit Profile</button>
            <button className="profileDeleteBtn" onClick={showModal}>
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <StockTickerAnimation />
      </div>
      <br />
      <div>
        <div className="profileSec2">
          <div className="portfolioWatchlist">
            {portfolios && portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <div
                  className="portfolioWatchlistStock"
                  key={portfolio.portfolio_id}
                >
                  <Link
                    className="portfolioWatchlistLink"
                    to={`/portfolios/${portfolio.portfolio_id}`}
                  >
                    {portfolio.portfolio_name}
                  </Link>
                  {portfolio.stocks.length > 0 ? (
                    <ul>
                      {portfolio.stocks.map((stock) => (
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
              <p>No watchlists available. Create your first watchlist!</p>
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
              <p>No watchlists available. Create your first watchlist!</p>
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
    </>
  );
};

export default UserProfile;
