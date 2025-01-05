import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import CloseStockModal from "./CloseStockModal";

function StockDetails() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { stockId } = useParams();
	const StockDetails = useSelector((state) => state.stockDetails);
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(StockDetails(stockId));
	}, [dispatch, stockId]);

	return (
		<>
			{StockDetails && (
				<div>
					<header>
						<div>logo</div>
						<input type="text" placeholder="search-bar" />
						<nav>
							<a href="/portfolios">portfolios</a>
							<a href="/watchlist">watchlist</a>
							<a href="/profile">profile</a>
						</nav>
					</header>
					<main>
						<section>
							<h1>{StockDetails.name}</h1>
							<h3>{`Price: ${StockDetails.price}`}</h3>
						</section>
						<section>
							<div>
								<img
									src={
										StockDetails.StockImages?.find((image) => image.preview)
											?.url
									}
									alt="Stock Preview"
								/>
							</div>
							<div>
								<button onClick={() => alert("Buy")}>Buy</button>
								<button onClick={() => alert("Sell")}>Sell</button>
								<button onClick={() => alert("Add to List")}>
									Add to List
								</button>
							</div>
						</section>
						<section>
							<h2>com-info</h2>
							<p>{StockDetails.description}</p>
							<h2>
								Owned by {StockDetails.UserId.firstName}{" "}
								{StockDetails.UserId.lastName}
							</h2>
						</section>
						<section>
							<h2>chat-gpt</h2>
							{/* placeholder */}
						</section>
						<div>
							<h3>{StockDetails.UserId.firstName}</h3>
							{sessionUser && sessionUser.id === StockDetails.UserId && (
								<OpenModalButton
									buttonText="Close"
									modalComponent={<CloseStockModal stockId={StockDetails.id} />}
									onModalClose={() => navigate(`/Stocks`)}
								/>
							)}
						</div>
					</main>
				</div>
			)}
		</>
	);
}

export default StockDetails;
