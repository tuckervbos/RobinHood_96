import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Watchlist from "../components/Watchlist"; // for test
import SearchBar from "../components/SearchBar/SearchBar"; // for test
import SearchResults from "../components/SearchBar/SearchResultPage"; //for test
import Layout from "./Layout";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <h1>Welcome!</h1>,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			// test component
			{
				path: "watchlists",
				element: <Watchlist />,
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
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);
