import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllStocksThunk } from "../../redux/stock";
import "./StockTickerAnimation.css";

const StockTickerAnimation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllStocksThunk());
  }, [dispatch]);

  const stocks = useSelector((state) => state.stock.stocks);

  return (
    <div className="stockTicker">
      <ul>
        {stocks.map(({ id, ticker, price }) => (
          <Link className="stockTickerLink" key={id} to={`/stocks/${id}`}>
            <span className="company">{ticker}</span>
            <span className="price">${price}</span>
          </Link>
        ))}
      </ul>
      <ul aria-hidden="true">
        {stocks.map(({ id, ticker, price }) => (
          <Link className="stockTickerLink" key={id} to={`/stocks/${id}`}>
            <span className="company">{ticker}</span>
            <span className="price">${price}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StockTickerAnimation;
