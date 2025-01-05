import AllPortfolios from "../components/AllPortfolios/AllPortfolios";
import OnePortfolio from "../components/OnePortfolio/OnePortfolio";
import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Watchlist from "../components/Watchlist"; // for test
import WatchlistDetails from "../components/WatchlistDetails/WatchlistDetails";
import SearchBar from "../components/SearchBar/SearchBar"; // for test
import SearchResults from "../components/SearchBar/SearchResultPage"; //for test
import Layout from "./Layout";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import LandingPage from "../components/LandingPage/LandingPage";
import HomePage from "../components/HomePage/HomePage";
import UserProfile from "../components/UserProfile";
import Stocks from "../components/Stocks/Stocks";
import StockDetails from "../components/StockDetails/StockDetails";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "home",
				element: <HomePage />,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			{
				path: "watchlists",
				element: <Watchlist />,
			},
			{
				path: "watchlists/:watchlist_id",
				element: <WatchlistDetails />,
			},
			{
				path: "searchbar",
				element: <SearchBar />,
			},
			{
				path: "searchres",
				element: <SearchResults />,
			},
			{
				path: "portfolios",
				element: <AllPortfolios />,
			},
			{
				path: "portfolios/:portfolio_id",
				element: <OnePortfolio />,
			},
			{
				path: "/profile",
				element: <UserProfile />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
			{
				path: "/stocks",
				element: <Stocks />,
			},
			{
				path: "/stocks/:stock_id",
				element: <StockDetails />,
			},
		],
	},
]);
