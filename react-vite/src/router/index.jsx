import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Watchlist from '../components/Watchlist'// for test
import AllPortfolios from '../components/AllPortfolios/AllPortfolios';
import OnePortfolio from '../components/OnePortfolio/OnePortfolio';
import Layout from './Layout';

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
        path:"watchlists",
        element:<Watchlist />
      },
      {
        path: "portfolios",
        element: <AllPortfolios />
      },
      {
        path: "portfolios/:portfolio_id",
        element: <OnePortfolio />
      }
    ],
  },
]);